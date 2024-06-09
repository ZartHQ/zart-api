import { Injectable } from '@nestjs/common';
import { signupDto } from './dto';

@Injectable()
export class AuthService {
  signup(dto: signupDto) {
    console.log(dto);

    return 'I am signed up';
  }

  signin() {
    return 'I am signed in';
  }
}
