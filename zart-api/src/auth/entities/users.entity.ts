import { BeforeInsert, Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { Exclude } from 'class-transformer';
import * as argon from 'argon2';

@Entity()
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  phoneNum: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  @Column()
  @Exclude() // Add { toPlainOnly: true } if you want to work with the password
  password: string;

  @BeforeInsert()
  async hashedPassword() {
    this.password = await argon.hash(this.password);
  }
}
