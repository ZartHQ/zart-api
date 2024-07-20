import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('NG')
  phoneNum: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
