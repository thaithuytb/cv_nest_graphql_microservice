import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CvServiceGrpc, ResponseCvFromGrpc } from './interfaces/cvServiceGrpc';
import { EducationCertificationService } from '../education_certification/education_certification.service';
import { InputCreateCvRequest } from './dtos/inputCreateCvRequest.dto';
import { WorkExperienceService } from '../work_experience/work_experience.service';
import { ExperienceProjectService } from '../experience_project/experience_project.service';

@Injectable()
export class CvService implements OnModuleInit {
  private cvServiceGrpc: CvServiceGrpc;

  constructor(
    @Inject('CV_PACKAGE') private client: ClientGrpc,
    @Inject(forwardRef(() => EducationCertificationService))
    private readonly educationCertificationService: EducationCertificationService,
    @Inject(forwardRef(() => WorkExperienceService))
    private readonly workExperienceService: WorkExperienceService,
    @Inject(forwardRef(() => ExperienceProjectService))
    private readonly experienceProjectService: ExperienceProjectService,
  ) {}

  onModuleInit() {
    this.cvServiceGrpc = this.client.getService<CvServiceGrpc>('CvServiceGrpc');
  }

  async getCvById(cvId: number): Promise<ResponseCvFromGrpc> {
    return await lastValueFrom(await this.cvServiceGrpc.getCv({ cvId }));
  }

  async getCvByCvIdAndUserId(
    cvId: number,
    userId: number,
  ): Promise<ResponseCvFromGrpc> {
    return await lastValueFrom(
      await this.cvServiceGrpc.getCvByCvIdAndUserId({ cvId, userId }),
    );
  }

  async createCv(cv: InputCreateCvRequest) {
    return await lastValueFrom(await this.cvServiceGrpc.createCv(cv));
  }

  //parent
  async findEducationCertificationsByCvId(cvId: number) {
    return await this.educationCertificationService.findEcs(cvId);
  }

  async findWorkExperiencesByCvId(cvId: number) {
    return await this.workExperienceService.findWEs(cvId);
  }

  async findExperienceProjectsByCvId(cvId: number) {
    return await this.experienceProjectService.findEps(cvId);
  }
}
