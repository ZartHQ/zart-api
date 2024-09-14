import { BeforeInsert, Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { Exclude } from 'class-transformer';
import * as argon from 'argon2';

@Entity()
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  @Column({ nullable: true })
  @Exclude() // Add { toPlainOnly: true } if you want to work with the password
  password: string;

  @Column({ nullable: true })
  googleId?: string;
}
