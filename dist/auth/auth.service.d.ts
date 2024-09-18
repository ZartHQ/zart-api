import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/users.entity';
import { SigninDto, SignupDto } from 'src/dto';
export declare class AuthService {
    private readonly jwt;
    private readonly config;
    private readonly userRepo;
    constructor(jwt: JwtService, config: ConfigService, userRepo: Repository<UserEntity>);
    signup(dto: SignupDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    signin({ email, password }: SigninDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    validateGoogleUser(profile: any): Promise<UserEntity>;
    signToken(userId: number, email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(token: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
