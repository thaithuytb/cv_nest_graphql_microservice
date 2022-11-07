import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ExperienceProject } from '../entities/experience_project.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import resolveError from '../error/error';

@Injectable()
export class ExperienceProjectService {
  constructor(
    @InjectRepository(ExperienceProject)
    private readonly experienceProjectRepository: EntityRepository<ExperienceProject>,
  ) {}

  async findExperienceProjectsByCvId(cvId: number) {
    try {
      return await this.experienceProjectRepository.find(
        {
          cv: {
            id: cvId,
          },
        },
        {
          populate: ['cv', 'workExperience'],
        },
      );
    } catch (error) {
      resolveError(error);
    }
  }

  async findExperienceProjectsByWEId(weId: number) {
    try {
      return await this.experienceProjectRepository.find(
        {
          workExperience: {
            id: weId,
          },
        },
        {
          populate: ['cv', 'workExperience'],
        },
      );
    } catch (error) {
      resolveError(error);
    }
  }
}
