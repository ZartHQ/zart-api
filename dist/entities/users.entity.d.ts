import { AbstractEntity } from './abstract-entity';
export declare class UserEntity extends AbstractEntity {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    image: string | null;
    password: string;
    googleId?: string;
}
