import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtStrategy } from './strategy';

@Module({
  providers: [AuthService, jwtStrategy],
  imports: [JwtModule.register({})],
  controllers: [AuthController],
})
export class AuthModule {}