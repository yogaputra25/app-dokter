import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jadwal } from './entity/jadwal.entity';
import { JadwalController } from './jadwal.controller';
import { JadwalService } from './jadwal.service';

@Module({
  imports: [TypeOrmModule.forFeature([Jadwal])],
  controllers: [JadwalController],
  providers: [JadwalService],
})
export class JadwalModule {}
