import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class day {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  dayName: string;
}
