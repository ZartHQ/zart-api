import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SigninDto, SignupDto } from 'src/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  /***
   * sign up using google 
   * url http://localhost:3010/v1/auth/google
   */
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  /**
   * sign up using google redirect
   * url http://localhost:3010/v1/auth/google/redirect
   * @param req 
   * @returns {user, token} token: access and refresh token
   */

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const user = req.user;
    const token = await this.authService.signToken(user.id, user.email);
    return { user, ...token };
  }

  /**
   * post refreshToken
   * url http://localhost:3010/v1/auth/refresh
   * 
   * @param refreshToken 
   * @returns token: string 
   */
  @Post('refresh')
  async refreshToken(@Body('token') refreshToken: string) {
    const token = await this.authService.refreshToken(refreshToken);
    return token;
  }
}
