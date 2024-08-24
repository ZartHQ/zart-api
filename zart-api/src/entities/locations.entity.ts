import { AbstractEntity } from "src/entities/abstract-entity";
import { Column, Entity } from "typeorm";

@Entity()
export class LocationEntity extends AbstractEntity{
  @Column()
  city: string;

  @Column()
  active: boolean;
}