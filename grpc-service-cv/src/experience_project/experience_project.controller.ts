import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ExperienceProjectService } from './experience_project.service';
import { InputCvIdRequest } from '../types/inputCvIdRequest';
import { ExperienceProject } from '../entities/experience_project.entity';
import { InputWEIdRequest } from '../types/InputWEIdRequest';

@Controller('experience-project')
export class ExperienceProjectController {
  constructor(private experienceProjectService: ExperienceProjectService) {}

  @GrpcMethod('ExperienceProjectServiceGrpc', 'findExperienceProjectsByCvId')
  async findWE(data: InputCvIdRequest): Promise<{ data: ExperienceProject[] }> {
    return {
      data: await this.experienceProjectService.findExperienceProjectsByCvId(
        data.cvId,
      ),
    };
  }

  @GrpcMethod('ExperienceProjectServiceGrpc', 'findExperienceProjectsByWEId')
  async findWEByWEId(
    data: InputWEIdRequest,
  ): Promise<{ data: ExperienceProject[] }> {
    return {
      data: await this.experienceProjectService.findExperienceProjectsByWEId(
        data.weId,
      ),
    };
  }
}
