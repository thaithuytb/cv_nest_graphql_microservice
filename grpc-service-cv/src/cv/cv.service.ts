import { Injectable } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Cv } from '../entities/cv.entity';
import { RpcException } from '@nestjs/microservices';
import resolveError from '../error/error';
import { InputCreateCvRequest } from './interfaces/InputCreateCvRequest';
import { EducationCertification } from 'src/entities/education_certification.entity';
import { WorkExperience } from 'src/entities/work_experience.entity';
import { ExperienceProject } from 'src/entities/experience_project.entity';

@Injectable()
export class CvService {
  constructor(
    private readonly orm: MikroORM,
    @InjectRepository(Cv)
    private readonly cvRepository: EntityRepository<Cv>,
  ) {}

  async getCv(cvId: number) {
    return await this.permissionCv(cvId);
  }

  async getCvByCvIdAndUserId(cvId: number, userId: number) {
    return await this.permissionCv(cvId, userId);
  }

  async createCv(inputCreateCv: InputCreateCvRequest) {
    const { name, nationality, gender, objective, summary, userId } =
      inputCreateCv;

    const em = this.orm.em.fork();
    await em.begin();
    try {
      const newCv = new Cv(
        name,
        nationality,
        gender,
        objective,
        summary,
        userId,
      );

      em.persist<Cv>(newCv);

      if (inputCreateCv.educationCertifications.length) {
        Promise.all(
          inputCreateCv.educationCertifications.map(async (e_c) => {
            const { name, time, major } = e_c;
            const newEC = new EducationCertification(name, time, major);
            newEC.cv = newCv;
            return em.persist<EducationCertification>(newEC);
          }),
        );
      }

      if (inputCreateCv.workExperiences.length) {
        await Promise.all(
          inputCreateCv.workExperiences.map(async (w_e) => {
            const { jobTitle, jobDescription, time, company } = w_e;
            const newWE = new WorkExperience(
              time,
              company,
              jobTitle,
              jobDescription,
            );
            newWE.cv = newCv;
            return em.persist<WorkExperience>(newWE);
          }),
        );
      }

      if (inputCreateCv.experienceProjects.length) {
        await Promise.all(
          inputCreateCv.experienceProjects.map(async (e_p, index) => {
            const { company, jobTitle, jobDescription } = e_p.workExperience;
            const w_e = await em.findOne(WorkExperience, {
              time: e_p.workExperience.time,
              company,
              job_title: jobTitle,
              job_description: jobDescription,
            });

            if (!w_e) {
              throw new RpcException({
                message: `Cant not found work_experience of ${
                  index + 1
                }th experience_projects`,
                code: 404,
              });
            }
            const {
              name,
              time,
              projectDescription,
              role,
              responsibilities,
              programmingLanguages,
            } = e_p;
            const newEP = new ExperienceProject(
              name,
              time,
              projectDescription,
              role,
              responsibilities,
              programmingLanguages,
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
      resolveError(error);
    }
  }

  //other
  async permissionCv(cvId: number, userId?: number) {
    try {
      const cv = await this.findCvById(cvId);
      if (!cv) {
        throw new RpcException({
          message: 'Cv not found',
          code: 404,
        });
      }

      if (!userId) {
        return cv;
      }

      if (cv.userId === userId) {
        return cv;
      }

      throw new RpcException({
        message: 'Forbidden',
        code: 403,
      });
    } catch (error) {
      resolveError(error);
    }
  }

  async findCvById(cvId: number) {
    return await this.cvRepository.findOne(cvId);
  }
}
