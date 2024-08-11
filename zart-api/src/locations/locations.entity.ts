import { AbstractEntity } from "src/auth/entities/abstract-entity";
import { Column, Entity } from "typeorm";

@Entity()
export class LocationEntity extends AbstractEntity{
  @Column()
  area: string;

  @Column()
  active: boolean;
}