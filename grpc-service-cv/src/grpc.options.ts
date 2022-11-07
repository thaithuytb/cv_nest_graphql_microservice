import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50000',
    package: [
      'cv',
      'educationCertification',
      'workExperience',
      'experienceProject',
    ],
    protoPath: [
      join(__dirname + '/protos/cv.proto'),
      join(__dirname + '/protos/cv_education_certification.proto'),
      join(__dirname + '/protos/cv_work_experience.proto'),
      join(__dirname + '/protos/cv_experience_project.proto'),
    ],
  },
};
