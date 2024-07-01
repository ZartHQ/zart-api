import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SigninDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(dto: SignupDto) {
    try {
      const { email, firstName, lastName, password } = dto;
      const passwordHash = await argon.hash(password);
      const user = await this.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          passwordHash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException('Credentials already exists');
        }
      }
      throw e;
    }
  }

  async signIn(dto: SigninDto) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // If user doesn't exist, throw exception
    if (!user) throw new NotFoundException('Credentials incorrect');
    // Compare password
    const validPassword = await argon.verify(user.passwordHash, dto.password);

    // If password incorrect throw exception
    if (!validPassword) throw new NotFoundException('Credentials incorrect');
    return this.signToken(user.id, user.email);
  }

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
