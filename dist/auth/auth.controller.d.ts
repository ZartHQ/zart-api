import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from 'src/dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(dto: SignupDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    signin(dto: SigninDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): Promise<{
        access_token: string;
        refresh_token: string;
        user: any;
    }>;
    refreshToken(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
