import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CvModule } from './cv/cv.module';
import { EducationCertificationModule } from './education_certification/education_certification.module';
import { WorkExperienceModule } from './work_experience/work_experience.module';
import { ExperienceProjectModule } from './experience_project/experience_project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(),
    CvModule,
    EducationCertificationModule,
    WorkExperienceModule,
    ExperienceProjectModule,
  ],
})
export class AppModule {}
