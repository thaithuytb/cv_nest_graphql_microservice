import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WorkExperienceService } from './work_experience.service';
import { InputCvIdRequest } from '../types/inputCvIdRequest';
import { WorkExperience } from '../entities/work_experience.entity';

@Controller('work-experience')
export class WorkExperienceController {
  constructor(private workExperienceService: WorkExperienceService) {}

  @GrpcMethod('WorkExperienceServiceGrpc', 'findWorkExperiencesByCvId')
  async findWE(data: InputCvIdRequest): Promise<{ data: WorkExperience[] }> {
    return {
      data: await this.workExperienceService.findWorkExperiencesByCvId(
        data.cvId,
      ),
    };
  }
}
