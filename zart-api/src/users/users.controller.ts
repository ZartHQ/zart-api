import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { jwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { UserEntity } from 'src/auth/entities/users.entity';

@UseGuards(jwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('me')
  getMe(@GetUser() user: UserEntity) {
    return user;
  }
}
