import { InjectRepository } from '@mikro-orm/nestjs';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CreateCvInput } from './dto/createCv_input.dto';
import {
  User,
  UserRole,
  Cv,
  WorkExperience,
  ExperienceProject,
  EducationCertification,
} from '../entities';
import { AuthService } from '../auth/auth.service';
import resolveError from '../errors/error';
import { EducationCertificationsService } from '../education_certifications/education_certifications.service';
import { WorkExperiencesService } from '../work_experiences/work_experiences.service';
import { ExperienceProjectsService } from '../experience_projects/experience_projects.service';
import { MikroORM } from '@mikro-orm/core';
import { PaginationInput } from '../types/inputs/paginationInput';
import { QueryCvsInput } from '../types/inputs/queryCvsInput';

@Injectable()
export class CvsService {
  constructor(
    private readonly orm: MikroORM,
    @InjectRepository(Cv)
    private readonly cvRepository: EntityRepository<Cv>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(forwardRef(() => EducationCertificationsService))
    private readonly educationCertificationsService: EducationCertificationsService,
    @Inject(forwardRef(() => WorkExperiencesService))
    private readonly workExperiencesService: WorkExperiencesService,
    @Inject(forwardRef(() => ExperienceProjectsService))
    private readonly experienceProjectsService: ExperienceProjectsService,
  ) {}
  //==========Call from resolver
  async createCv(createCvInput: CreateCvInput, user: User) {
    const { name, nationality, gender, objective, summary } = createCvInput;
    const em = this.orm.em.fork();
    await em.begin();
    try {
      const newCv = new Cv(name, nationality, gender);
      newCv.objective = objective;
      newCv.summary = summary;
      newCv.user = user;

      em.persist<Cv>(newCv);

      if (createCvInput.education_certifications.length) {
        Promise.all(
          createCvInput.education_certifications.map(async (e_c) => {
            const { name, time, major } = e_c;
            const newEC = new EducationCertification(name, time);
            newEC.major = major;
            newEC.cv = newCv;

            return em.persist<EducationCertification>(newEC);
          }),
        );
      }

      if (createCvInput.workExperiences.length) {
        await Promise.all(
          createCvInput.workExperiences.map(async (w_e) => {
            const { job_title, job_description, time, company } = w_e;
            const newWE = new WorkExperience(time, job_title, job_description);
            newWE.company = company;
            newWE.cv = newCv;

            return em.persist<WorkExperience>(newWE);
          }),
        );
      }

      if (createCvInput.experienceProjects.length) {
        await Promise.all(
          createCvInput.experienceProjects.map(async (e_p, index) => {
            const w_e = await em.findOne(WorkExperience, {
              ...e_p.workExperience,
            });
            if (!w_e) {
              throw new HttpException(
                `Cant not found work_experience of ${
                  index + 1
                }th experience_projects`,
                HttpStatus.NOT_FOUND,
              );
            }
            const {
              name,
              time,
              project_description,
              role,
              responsibilities,
              programming_languages,
            } = e_p;
            const newEP = new ExperienceProject(
              name,
              time,
              project_description,
              role,
              responsibilities,
              programming_languages,
            );
            newEP.cv = newCv;
            newEP.workExperience = w_e;

            return em.persist<ExperienceProject>(newEP);
          }),
        );
      }
      await em.commit();
      return newCv;
    } catch (error) {
      await em.rollback();

      if (error.status === 404) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      resolveError(error);
    }
  }

  async getCv(cv_id: number, user: User) {
    return await this.permissionCv(cv_id, user);
  }

  async getUserByEmail(email: string) {
    return await this.authService.getUserByEmail(email);
  }

  async getCvs(
    user_id: number | null,
    pagination: PaginationInput,
    q: QueryCvsInput,
  ) {
    const { skip, take } = pagination;
    const maxPage = 3;
    try {
      const cvs = user_id
        ? await this.cvRepository.find(
            {
              name: {
                $like: q.name ? `%${q.name}%` : '%',
              },
              user: {
                id: user_id,
                age: {
                  $gte: q.age ? q.age : 18,
                },
              },
              workExperiences: {
                company: {
                  $like: q.company ? `%${q.company}%` : '%',
                },
              },
              experienceProjects: {
                programming_languages: {
                  $like: q.programming_languages
                    ? `%${q.programming_languages}%`
                    : '%',
                },
              },
            },
            {
              offset: skip * maxPage,
              limit: take,
            },
          )
        : await this.cvRepository.find(
            {
              name: {
                $like: q.name ? `%${q.name}%` : '%',
              },
              user: {
                age: {
                  $gte: q.age ? q.age : 18,
                },
              },
              workExperiences: {
                company: {
                  $like: q.company ? `%${q.company}%` : '%',
                },
              },
              experienceProjects: {
                programming_languages: {
                  $like: q.programming_languages
                    ? `%${q.programming_languages}%`
                    : '%',
                },
              },
            },
            {
              offset: skip * maxPage,
              limit: take,
            },
          );

      return cvs;
    } catch (error) {
      resolveError(error);
    }
  }
  //==========Call from resolver
  //==========Parent
  async getEducationCertifications(cv_id: number) {
    return this.educationCertificationsService.getEducationCertificationsByCvId(
      cv_id,
    );
  }

  async getWorkExperiences(cv_id: number) {
    return this.workExperiencesService.getWorkExperiencesByCvId(cv_id);
  }

  async getExperienceProjects(cv_id: number) {
    return this.experienceProjectsService.getExperienceProjectsByCvId(cv_id);
  }
  //==========Parent
  //==========other
  async permissionCv(cv_id: number, user: User) {
    try {
      const cv = await this.getCvById(cv_id);
      if (!cv) {
        throw new HttpException('Cv not found', HttpStatus.NOT_FOUND);
      }

      if (cv.user.id === user.id || user.role === UserRole.ADMIN) {
        return cv;
      }

      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    } catch (error) {
      resolveError(error);
    }
  }

  async getCvById(id: number) {
    return await this.cvRepository.findOne(id, {
      populate: ['user'],
    });
  }

  async getCvsByUserId(user_id: number) {
    return await this.cvRepository.find({
      user: {
        id: user_id,
      },
    });
  }
}
