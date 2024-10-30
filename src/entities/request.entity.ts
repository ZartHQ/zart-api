import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './abstract-entity';

@Entity()
export class RequestEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  budget: number;

  @Column({ type: 'date' })
  selectedDate: string;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;
}
