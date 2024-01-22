import { Jadwal } from 'src/jadwal/entity/jadwal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Jadwal, (jadwal) => jadwal.user)
  jadwal: Jadwal[];
}
