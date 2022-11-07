import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { EducationCertification } from '../entities/education_certification.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import resolveError from '../error/error';

@Injectable()
export class EducationCertificationService {
  constructor(
    @InjectRepository(EducationCertification)
    private readonly educationCertificationRepository: EntityRepository<EducationCertification>,
  ) {}

  async findEducationCertificationsByCvId(cvId: number) {
    try {
      return await this.educationCertificationRepository.find(
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
