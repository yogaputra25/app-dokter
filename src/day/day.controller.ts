import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DayService } from './day.service';
import { SuccessResponseFactory } from 'src/helper/succes.helper';
import { JwtGuard } from 'src/guards/jwt-auth.guard';
import { day } from './entity/day.entity';
@UseGuards(JwtGuard)
@Controller('day')
export class DayController {
  constructor(private dayService: DayService) {}

  @Get()
  async getAllDay(): Promise<SuccessResponseFactory> {
    const data = await this.dayService.dataAllDay();
    return SuccessResponseFactory.ok('Successfully', data);
  }
}
