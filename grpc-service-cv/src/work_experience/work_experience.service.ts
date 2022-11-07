import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { WorkExperience } from '../entities/work_experience.entity';
import resolveError from '../error/error';

@Injectable()
export class WorkExperienceService {
  constructor(
    @InjectRepository(WorkExperience)
    private readonly workExperienceRepository: EntityRepository<WorkExperience>,
  ) {}

  async findWorkExperiencesByCvId(cvId: number) {
    try {
      return await this.workExperienceRepository.find(
        {
          cv: {
            id: cvId,
          },
        },
        {
          populate: ['cv'],
        },
      );
    } catch (error) {
      resolveError(error);
    }
  }
}
