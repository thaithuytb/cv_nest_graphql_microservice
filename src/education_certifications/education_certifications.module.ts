import { Module, forwardRef } from '@nestjs/common';
import { EducationCertificationsService } from './education_certifications.service';
import { EducationCertificationsResolver } from './education_certifications.resolver';
import { EducationCertification } from '../entities/education_certification.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CvsModule } from '../cvs/cvs.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([EducationCertification]),
    forwardRef(() => CvsModule),
  ],
  providers: [EducationCertificationsService, EducationCertificationsResolver],
  exports: [EducationCertificationsService],
})
export class EducationCertificationsModule {}
