import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entity/user.entity';
import { DayController } from './day/day.controller';
import { DayService } from './day/day.service';
import { DayModule } from './day/day.module';
import { JadwalController } from './jadwal/jadwal.controller';
import { JadwalService } from './jadwal/jadwal.service';
import { JadwalModule } from './jadwal/jadwal.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'temp123',
      database: 'dbdokter',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    DayModule,
    JadwalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
