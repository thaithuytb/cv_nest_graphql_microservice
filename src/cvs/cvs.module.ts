import { Module, forwardRef } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CvsResolver } from './cvs.resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Cv } from '../entities/cv.entity';
import { AuthModule } from '../auth/auth.module';
import { EducationCertificationsModule } from '../education_certifications/education_certifications.module';
import { WorkExperiencesModule } from '../work_experiences/work_experiences.module';
import { ExperienceProjectsModule } from '../experience_projects/experience_projects.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Cv]),
    forwardRef(() => AuthModule),
    forwardRef(() => EducationCertificationsModule),
    forwardRef(() => WorkExperiencesModule),
    forwardRef(() => ExperienceProjectsModule),
  ],
  providers: [CvsService, CvsResolver],
  exports: [CvsService],
})
export class CvsModule {}
