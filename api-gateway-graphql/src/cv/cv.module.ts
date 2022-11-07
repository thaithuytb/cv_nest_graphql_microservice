import { forwardRef, Module } from '@nestjs/common';
import { CvResolver } from './cv.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CvService } from './cvService';
import { EducationCertificationModule } from '../education_certification/education_certification.module';
import { WorkExperienceModule } from '../work_experience/work_experience.module';
import { ExperienceProjectModule } from '../experience_project/experience_project.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CV_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50000',
          package: 'cv',
          protoPath: join(__dirname, '/../protos/cv.proto'),
        },
      },
    ]),
    AuthModule,
    forwardRef(() => EducationCertificationModule),
    forwardRef(() => WorkExperienceModule),
    forwardRef(() => ExperienceProjectModule),
  ],
  providers: [CvService, CvResolver],
  exports: [CvService],
})
export class CvModule {}
