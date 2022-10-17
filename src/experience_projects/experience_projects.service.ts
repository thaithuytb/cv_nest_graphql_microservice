import { InjectRepository } from '@mikro-orm/nestjs';
import {
  Injectable,
  HttpStatus,
  HttpException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import resolveError from '../errors/error';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CvsService } from '../cvs/cvs.service';
import { WorkExperiencesService } from '../work_experiences/work_experiences.service';
import { CreateExperienceProjectInput } from './dto/createEP_input.dto';
import { WorkExperience, Cv, ExperienceProject } from '../entities';

@Injectable()
export class ExperienceProjectsService {
  constructor(
    @InjectRepository(ExperienceProject)
    private readonly experienceProjectRepository: EntityRepository<ExperienceProject>,
    @Inject(forwardRef(() => CvsService))
    private readonly cvsService: CvsService,
    @Inject(forwardRef(() => WorkExperiencesService))
    private readonly workExperiencesService: WorkExperiencesService,
  ) {}
  //==========Call from resolver
  async createExperienceProject(
    createEPInput: CreateExperienceProjectInput,
    cv: Cv,
    wE: WorkExperience,
  ) {
    const {
      name,
      time,
      project_description,
      role,
      responsibilities,
      programming_languages,
    } = createEPInput;
    try {
      const newEP = new ExperienceProject(
        name,
        time,
        project_description,
        role,
        responsibilities,
        programming_languages,
      );
      newEP.workExperience = wE;
      newEP.cv = cv;

      const newEPDb = await this.experienceProjectRepository.create(newEP);
      await this.experienceProjectRepository.persistAndFlush(newEPDb);

      return newEPDb;
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

  async getWorkExperienceByIdAndCvId(w_e_id: number, cv_id: number) {
    return await this.workExperiencesService.getWorkExperiencesByIdAndCvId(
      w_e_id,
      cv_id,
    );
  }

  //parent
  async getExperienceProjectsByCvId(cv_id: number) {
    try {
      return await this.experienceProjectRepository.find({
        cv: {
          id: cv_id,
        },
      });
    } catch (error) {
      resolveError(error);
    }
  }

  async getExperienceProjectsByWEId(w_e_id: number) {
    try {
      return await this.experienceProjectRepository.find({
        workExperience: {
          id: w_e_id,
        },
      });
    } catch (error) {
      resolveError(error);
    }
  }
}
