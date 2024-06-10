import { Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: SignupDto) {
    const { email, firstName, lastName, password } = dto;
    const hash = await argon.hash(password);
    const user = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        hash,
      },
    });
    console.log(dto);

    return user;
  }
 
  signin(dto: SigninDto) {
    return dto;
  }
}
