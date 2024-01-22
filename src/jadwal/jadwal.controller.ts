import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JadwalService } from './jadwal.service';
import { JwtGuard } from 'src/guards/jwt-auth.guard';
import { JadwalDto } from './dto/jadwal.dto';
import { User } from 'src/user/entity/user.entity';
import { PaginationDto } from 'src/dto/pagination.dto';
import { SuccessResponseFactory } from 'src/helper/succes.helper';
import { Jadwal } from './entity/jadwal.entity';
@UseGuards(JwtGuard)
@Controller('jadwal')
export class JadwalController {
  constructor(private jadwalService: JadwalService) {}

  @Post('/:idUser/post-jadwal')
  createJadwal(@Body() create: JadwalDto, @Param('idUser') idUser: User) {
    this.jadwalService.createJadwal(create, idUser);
    return {
      stausCode: HttpStatus.CREATED,
      message: 'Created',
    };
  }

  @Get()
  async getAllJadwal(
    @Query() query: PaginationDto,
  ): Promise<SuccessResponseFactory> {
    const response = await this.jadwalService.dataAll(query);
    return SuccessResponseFactory.ok('Successfully', response);
  }
  @Delete('/:id/delete')
  async deleteJadwal(@Param('id') id: number): Promise<SuccessResponseFactory> {
    const response = await this.jadwalService.deleteJadwal(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'data deleted',
    };
  }
  @Put('/:id/update')
  async updateJadwal(
    @Param('id') id: any,
    @Body() update: Jadwal,
  ): Promise<SuccessResponseFactory> {
    const response = await this.jadwalService.updateJadwal(id, update);
    return SuccessResponseFactory.ok('Update Successfuly', response);
  }
}
