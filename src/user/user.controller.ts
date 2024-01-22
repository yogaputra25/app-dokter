import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationDto } from 'src/dto/pagination.dto';
import { SuccessResponseFactory } from 'src/helper/succes.helper';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Get()
  // getAllUser(){
  //     const response= this.userService.getAllUser()
  //     return
  // }

  @Get()
  async getAllUser(
    @Query() query: PaginationDto,
  ): Promise<SuccessResponseFactory> {
    const response = await this.userService.dataAll(query);
    return SuccessResponseFactory.ok('Successfully', response);
  }
}
