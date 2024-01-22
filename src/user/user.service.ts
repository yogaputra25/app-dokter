import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Like, Repository } from 'typeorm';
import { CreateDto } from './dto/createuser.dto';
import { paginateResponse } from 'src/helper/pagination.helper';
import { PaginationDto } from 'src/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async getUserOne(query: object) {
    return await this.userRepository.findOne(query);
  }
  async createUser(data: CreateDto) {
    return await this.userRepository.save(data);
  }
  async getAllUser() {
    return await this.userRepository.find({
      select: {
        password: false,
      },
    });
  }

  async dataAll(query: PaginationDto) {
    const take = query.take || 10; // 10
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';

    const data = await this.userRepository.findAndCount({
      select: {
        id: true,
        username: true,
        email: true,
      },

      order: { username: 'DESC' },
      take: take,
      skip: skip,
    });
    return paginateResponse(data, page, take);
  }
}
