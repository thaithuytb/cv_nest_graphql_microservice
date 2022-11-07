import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { EPServiceGrpc } from './interfaces/epServiceGrpc';
import { ClientGrpc } from '@nestjs/microservices';
import { CvService } from '../cv/cvService';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExperienceProjectService {
  private epServiceGrpc: EPServiceGrpc;

  constructor(
    @Inject('EP_PACKAGE') private client: ClientGrpc,
    @Inject(forwardRef(() => CvService))
    private readonly cvService: CvService,
  ) {}

  onModuleInit() {
    this.epServiceGrpc = this.client.getService<EPServiceGrpc>(
      'ExperienceProjectServiceGrpc',
    );
  }

  async findEps(cvId: number) {
    return await lastValueFrom(
      await this.epServiceGrpc.findExperienceProjectsByCvId({ cvId }),
    );
  }

  async findEpsByWEId(weId: number) {
    return await lastValueFrom(
      await this.epServiceGrpc.findExperienceProjectsByWEId({ weId }),
    );
  }
}
