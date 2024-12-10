import { AbstractEntity } from "src/entities/abstract-entity";
import { Entity, Column } from "typeorm";

@Entity()
export class RequestArtisanEntity extends AbstractEntity {
  @Column({ type: "date" })
  selectedDate: string;

  @Column()
  selectedTimeSlot: string;
}
