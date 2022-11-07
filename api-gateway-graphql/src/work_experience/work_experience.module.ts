import { forwardRef, Module } from '@nestjs/common';
import { WorkExperienceService } from './work_experience.service';
import { WorkExperienceResolver } from './work_experience.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CvModule } from '../cv/cv.module';
import { ExperienceProjectModule } from '../experience_project/experience_project.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50000',
          package: 'workExperience',
          protoPath: join(__dirname, '/../protos/cv_work_experience.proto'),
        },
      },
    ]),
    forwardRef(() => CvModule),
    ExperienceProjectModule,
  ],
  providers: [WorkExperienceService, WorkExperienceResolver],
  exports: [WorkExperienceService],
})
export class WorkExperienceModule {}
