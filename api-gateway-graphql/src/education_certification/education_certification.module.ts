import { Module, forwardRef } from '@nestjs/common';
import { EducationCertificationService } from './education_certification.service';
import { EducationCertificationResolver } from './education_certification.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CvModule } from '../cv/cv.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EC_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50000',
          package: 'educationCertification',
          protoPath: join(
            __dirname,
            '/../protos/cv_education_certification.proto',
          ),
        },
      },
    ]),
    forwardRef(() => CvModule),
  ],
  providers: [EducationCertificationService, EducationCertificationResolver],
  exports: [EducationCertificationService],
})
export class EducationCertificationModule {}
