import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { jwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(jwtGuard)
@Controller('users')
export class UsersController {
  // constructor(private readonly usersService: UsersService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
