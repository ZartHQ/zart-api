import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SigninDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async signup(dto: SignupDto) {
    try {
      const user = this.userRepo.create(dto);
      await user.save();
      return this.signToken(user.id, user.email);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Credentials already exists');
      }
      throw e;
    }
  }

  // async signIn(dto: SigninDto) {
  //   // Find the user by email
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       email: dto.email,
  //     },
  //   });
  //   // If user doesn't exist, throw exception
  //   if (!user) throw new NotFoundException('Credentials incorrect');
  //   // Compare password
  //   const validPassword = await argon.verify(user.passwordHash, dto.password);

  //   // If password incorrect throw exception
  //   if (!validPassword) throw new NotFoundException('Credentials incorrect');
  //   return this.signToken(user.id, user.email);
  // }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwt.sign(payload, {
      expiresIn: '60m',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
