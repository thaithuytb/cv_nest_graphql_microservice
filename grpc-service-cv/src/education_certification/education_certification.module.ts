import { Module } from '@nestjs/common';
import { EducationCertificationController } from './education_certification.controller';
import { EducationCertificationService } from './education_certification.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EducationCertification } from '../entities/education_certification.entity';

@Module({
  imports: [MikroOrmModule.forFeature([EducationCertification])],
  providers: [EducationCertificationService],
  controllers: [EducationCertificationController],
})
export class EducationCertificationModule {}
