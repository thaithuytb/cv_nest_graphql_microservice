import { forwardRef, Module } from '@nestjs/common';
import { ExperienceProjectService } from './experience_project.service';
import { ExperienceProjectResolver } from './experience_project.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CvModule } from '../cv/cv.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EP_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50000',
          package: 'experienceProject',
          protoPath: join(__dirname, '/../protos/cv_experience_project.proto'),
        },
      },
    ]),
    forwardRef(() => CvModule),
  ],
  providers: [ExperienceProjectService, ExperienceProjectResolver],
  exports: [ExperienceProjectService],
})
export class ExperienceProjectModule {}
