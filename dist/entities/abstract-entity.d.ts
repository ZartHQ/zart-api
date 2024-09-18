import { BaseEntity } from 'typeorm';
export declare abstract class AbstractEntity extends BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
