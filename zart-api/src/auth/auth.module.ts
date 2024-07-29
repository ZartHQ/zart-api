import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtStrategy } from './strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { GoogleStrategy } from './strategy/google.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [AuthService, jwtStrategy, GoogleStrategy],
  imports: [
    ConfigModule,
    JwtModule.register({
      global: true,
    }),
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
