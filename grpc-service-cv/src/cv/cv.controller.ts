import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CvService } from './cv.service';
import { InputCvIdRequest } from '../types/inputCvIdRequest';
import { Cv } from '../entities/cv.entity';
import { InputCreateCvRequest } from './interfaces/InputCreateCvRequest';
import { InputCvIdAndUserIdRequest } from '../types/inputCvIdAndUserIdRequest';

@Controller()
export class CvController {
  constructor(private cvService: CvService) {}

  @GrpcMethod('CvServiceGrpc', 'getCv')
  async getCv(data: InputCvIdRequest): Promise<{ cv: Cv }> {
    return {
      cv: await this.cvService.getCv(data.cvId),
    };
  }

  @GrpcMethod('CvServiceGrpc', 'createCv')
  async createCv(data: InputCreateCvRequest): Promise<{ cv: Cv }> {
    return {
      cv: await this.cvService.createCv(data),
    };
  }

  @GrpcMethod('CvServiceGrpc', 'getCvByCvIdAndUserId')
  async getCvByIdAndUserId(
    data: InputCvIdAndUserIdRequest,
  ): Promise<{ cv: Cv }> {
    return {
      cv: await this.cvService.getCvByCvIdAndUserId(data.cvId, data.userId),
    };
  }
}
