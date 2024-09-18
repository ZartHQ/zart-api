import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UserEntity } from '../entities/users.entity';
import { Repository } from 'typeorm';
declare const jwtStrategy_base: new (...args: any[]) => Strategy;
export declare class jwtStrategy extends jwtStrategy_base {
    private userRepo;
    constructor(config: ConfigService, userRepo: Repository<UserEntity>);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<UserEntity>;
}
export {};
