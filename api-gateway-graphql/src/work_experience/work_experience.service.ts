import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { WEServiceGrpc } from './interfaces/weServiceGrpc';
import { CvService } from '../cv/cvService';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WorkExperienceService {
  private weServiceGrpc: WEServiceGrpc;

  constructor(
    @Inject('WE_PACKAGE') private client: ClientGrpc,
    @Inject(forwardRef(() => CvService))
    private readonly cvService: CvService,
  ) {}

  onModuleInit() {
    this.weServiceGrpc = this.client.getService<WEServiceGrpc>(
      'WorkExperienceServiceGrpc',
    );
  }

  async findWEs(cvId: number) {
    return await lastValueFrom(
      await this.weServiceGrpc.findWorkExperiencesByCvId({ cvId }),
    );
  }
}
