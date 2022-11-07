import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ECServiceGrpc } from './interfaces/ecServiceGrpc';
import { lastValueFrom } from 'rxjs';
import { CvService } from '../cv/cvService';

@Injectable()
export class EducationCertificationService {
  private ecServiceGrpc: ECServiceGrpc;

  constructor(
    @Inject('EC_PACKAGE') private client: ClientGrpc,
    @Inject(forwardRef(() => CvService))
    private readonly cvService: CvService,
  ) {}

  onModuleInit() {
    this.ecServiceGrpc = this.client.getService<ECServiceGrpc>(
      'EducationCertificationServiceGrpc',
    );
  }

  async findEcs(cvId: number) {
    return await lastValueFrom(
      await this.ecServiceGrpc.findEducationCertificationsByCvId({ cvId }),
    );
  }

  //parent
  async findCv(cvId: number) {
    return await this.cvService.getCvById(cvId);
  }
}
