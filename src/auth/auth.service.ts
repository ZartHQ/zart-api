import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/users.entity';
import { SigninDto, SignupDto } from 'src/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async signup(dto: SignupDto) {
    try {
      if (dto.password !== dto.confirmPassword) {
        throw new BadRequestException('Passwords do not match!');
      }
      dto.password = await argon.hash(dto.password);
      const user = this.userRepo.create(dto);
      await user.save();
      return this.signToken(user.id, user.email);
    } catch (e) {
      throw e;
    }
  }

  async signin({ email, password }: SigninDto) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      if (!user) throw new NotFoundException('Credentials incorrect');

      const validPassword = await argon.verify(user.password, password);
      if (!validPassword) throw new NotFoundException('Credentials incorrect');
      return this.signToken(user.id, user.email);
    } catch (e) {
      throw e;
    }
  }
  
  /**
   *
   * @param profile (google user profile)
   * @returns user details
   */
  async validateGoogleUser(profile: any) {
    const { id, emails, name, photos } = profile;
    const email = emails[0].value;

    let user = await this.userRepo.findOne({ where: { googleId: id } });
    if (!user) {
      user = await this.userRepo.findOne({ where: { email } });
      if (!user) {
        user = this.userRepo.create({
          email,
          googleId: id,
          firstName: name.givenName,
          lastName: name.familyName,
          image: photos[0].value,
        });
        await this.userRepo.save(user);
      } else {
        // If user exists but has no googleId, link their account
        user.googleId = id;
        await this.userRepo.save(user);
      }
    }
    return user;
  }

  /**
   *
   * @param userId
   * @param email
   * @returns {accessToken, refreshToken}
   */

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '10m',
      secret: this.config.get('JWT_SECRET'),
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  /**
   *
   * @param refreshToken
   * @returns refreshToken
   */
  async refreshToken(
    token: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.userRepo.findOne({ where: { id: payload.sub } });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.signToken(user.id, user.email);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
