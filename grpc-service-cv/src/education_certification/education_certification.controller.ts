import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { EducationCertificationService } from './education_certification.service';
import { InputCvIdRequest } from '../types/inputCvIdRequest';
import { EducationCertification } from '../entities/education_certification.entity';

@Controller('education-certification')
export class EducationCertificationController {
  constructor(
    private educationCertificationService: EducationCertificationService,
  ) {}

  @GrpcMethod(
    'EducationCertificationServiceGrpc',
    'findEducationCertificationsByCvId',
  )
  async findEC(
    data: InputCvIdRequest,
  ): Promise<{ data: EducationCertification[] }> {
    return {
      data: await this.educationCertificationService.findEducationCertificationsByCvId(
        data.cvId,
      ),
    };
  }
}
