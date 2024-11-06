import { AbstractEntity } from "src/entities/abstract-entity";
import { Entity, Column } from "typeorm";

@Entity()
export class RequestEntity extends AbstractEntity {
  @Column({ type: "date" })
  selectedDate: string;

  @Column()
  selectedTimeSlot: string;
}
