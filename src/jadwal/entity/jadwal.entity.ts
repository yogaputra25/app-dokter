import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Jadwal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;

  @Column()
  timeStart: string;

  @Column()
  timeFinish: string;

  @Column()
  quota: number;

  @Column()
  status: boolean;

  @Column()
  date: string;

  @ManyToOne(() => User, (user) => user.jadwal)
  user: User;
}
