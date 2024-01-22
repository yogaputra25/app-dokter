import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { day } from './entity/day.entity';
import { Repository } from 'typeorm';
import { SuccessResponseFactory } from 'src/helper/succes.helper';

@Injectable()
export class DayService {
  constructor(@InjectRepository(day) private dayRepo: Repository<day>) {}

  async dataAllDay() {
    const response = await this.dayRepo.find();
    return response;
  }
}
