import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
