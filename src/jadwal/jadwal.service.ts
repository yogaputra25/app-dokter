import {
  Body,
  Inject,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jadwal } from './entity/jadwal.entity';
import { Like, Repository } from 'typeorm';
import { JadwalDto } from './dto/jadwal.dto';
import { User } from 'src/user/entity/user.entity';
import { PaginationDto } from 'src/dto/pagination.dto';
import { paginateResponse } from 'src/helper/pagination.helper';
import { format } from 'path';

@Injectable()
export class JadwalService {
  constructor(
    @InjectRepository(Jadwal) private jadwalRepo: Repository<Jadwal>,
  ) {}

  async createJadwal(create: JadwalDto, id: User) {
    const [startDate, endDate] = create.dateRange.split(' s/d ');

    const start = new Date(startDate);
    const end = new Date(endDate);

    // const jadwal = new Jadwal();
    // jadwal.user = id;
    // jadwal.date = create.date;
    // jadwal.day = create.day;
    // jadwal.quota = create.quota;
    // jadwal.status = create.status;
    // jadwal.timeFinish = create.timeFinish;
    // jadwal.timeStart = create.timeStart;

    const users = [];
    for (
      let date: Date = start;
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      const jadwal = new Jadwal();
      jadwal.user = id;
      jadwal.date = date.toLocaleDateString().split('/').join('-');
      jadwal.day = date.toLocaleString('id-ID', { weekday: 'long' }).toString();
      jadwal.quota = create.quota;
      jadwal.status = create.status;
      jadwal.timeFinish = create.timeFinish;
      jadwal.timeStart = create.timeStart;

      users.push(jadwal);
    }

    for (let index = 0; index < users.length; index++) {
      await this.jadwalRepo.save(users[index]);
    }
  }

  async dataAll(query: PaginationDto) {
    const take = query.take || 10; // 10
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';

    const data = await this.jadwalRepo.findAndCount({
      select: {
        id: true,
        day: true,
        timeStart: true,
        timeFinish: true,
        quota: true,
        status: true,
        date: true,
        user: {
          id: true,
          username: true,
          email: true,
        },
      },
      where: { user: { username: Like('%' + keyword + '%') } },
      relations: { user: true },
      order: { user: { username: 'DESC' } },
      take: take,
      skip: skip,
    });
    return paginateResponse(data, page, take);
  }

  async deleteJadwal(id: number) {
    await this.jadwalRepo.delete(id);
  }

  async updateJadwal(@Param('id') id: any, @Body() update: Jadwal) {
    const jadwal = await this.jadwalRepo.findOne({ where: { id } });
    if (!jadwal) {
      throw new NotFoundException('Jadwal not found');
    }
    Object.assign(jadwal, update);

    await this.jadwalRepo.save(jadwal);

    return jadwal;
  }
}
