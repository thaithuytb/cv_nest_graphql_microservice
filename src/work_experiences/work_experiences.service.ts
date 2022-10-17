import { InjectRepository } from '@mikro-orm/nestjs';
import {
  Inject,
  Injectable,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WorkExperience, Cv } from '../entities';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CvsService } from '../cvs/cvs.service';
import { CreateWorkExperienceInput } from './dto/createWE_input.dto';
import resolveError from '../errors/error';
import { ExperienceProjectsService } from '../experience_projects/experience_projects.service';

@Injectable()
export class WorkExperiencesService {
  constructor(
    @InjectRepository(WorkExperience)
    private readonly workExperienceRepository: EntityRepository<WorkExperience>,
    @Inject(forwardRef(() => CvsService))
    private readonly cvsService: CvsService,
    @Inject(forwardRef(() => ExperienceProjectsService))
    private readonly experienceProjectsService: ExperienceProjectsService,
  ) {}
  //==========Call from resolver
  async createWorkExperience(createWEInput: CreateWorkExperienceInput, cv: Cv) {
    const { job_title, job_description, time, company } = createWEInput;
    try {
      const newWE = new WorkExperience(time, job_title, job_description);
      newWE.company = company;
      newWE.cv = cv;

      const newWEDb = await this.workExperienceRepository.create(newWE);
      await this.workExperienceRepository.persistAndFlush(newWEDb);

      return newWEDb;
    } catch (error) {
      resolveError(error);
    }
  }
  //==========Call from resolver
  async getCvByUserIdAndCvId(cv_id: number, user_id: number) {
    try {
      const cv = await this.cvsService.getCvById(cv_id);
      if (!cv) {
        throw new HttpException('Cv not found', HttpStatus.NOT_FOUND);
      }
      if (cv.user.id !== user_id) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      return cv;
    } catch (error) {
      resolveError(error);
    }
  }

  async getWorkExperiencesByIdAndCvId(w_e_id: number, cv_id: number) {
    try {
      const wE = await this.workExperienceRepository.findOne({
        id: w_e_id,
        cv: {
          id: cv_id,
        },
      });
      if (!wE) {
        throw new HttpException(
          'Work Experience not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return wE;
    } catch (error) {
      resolveError(error);
    }
  }
  //parent
  async getExperienceProjectsByWEId(w_e_id: number) {
    return await this.experienceProjectsService.getExperienceProjectsByWEId(
      w_e_id,
    );
  }

  async getWorkExperiencesByCvId(cv_id: number) {
    try {
      return await this.workExperienceRepository.find({
        cv: {
          id: cv_id,
        },
      });
    } catch (error) {
      resolveError(error);
    }
  }
}
