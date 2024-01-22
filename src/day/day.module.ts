import { Module } from '@nestjs/common';
import { DayController } from './day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayService } from './day.service';
import { day } from './entity/day.entity';

@Module({
  imports: [TypeOrmModule.forFeature([day])],
  controllers: [DayController],
  providers: [DayService],
})
export class DayModule {}
