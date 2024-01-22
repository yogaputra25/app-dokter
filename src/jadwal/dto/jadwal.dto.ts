import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class JadwalDto {
  //   @IsString()
  //   day: string;
  @IsString()
  timeStart: string;
  @IsString()
  timeFinish: string;
  @IsNumber()
  quota: number;
  @IsBoolean()
  status: boolean;
  @IsString()
  dateRange: string;
}
