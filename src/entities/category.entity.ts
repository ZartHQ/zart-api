import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @Column("simple-array", { nullable: true })
  subCategory: string[];

  @Column({ nullable: true })
  description: string;
}
