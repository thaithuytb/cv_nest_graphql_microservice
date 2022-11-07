import { Module } from '@nestjs/common';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Cv } from '../entities/cv.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Cv])],
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}
