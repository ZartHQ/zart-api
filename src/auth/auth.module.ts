import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtStrategy } from 'src/strategy';
import { UserEntity } from 'src/entities/users.entity';
import { GoogleStrategy } from 'src/strategy/google.strategy';

@Module({
  providers: [AuthService, jwtStrategy, GoogleStrategy],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
        global: true,
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
