import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Cv } from '../types/cv.type';
import { CvService } from './cvService';
import { RpcException } from '@nestjs/microservices';
import { EducationCertification } from '../types/education_certification.type';
import { InputCreateCvRequest } from './dtos/inputCreateCvRequest.dto';
import { WorkExperience } from '../types/work_experience.type';
import { ExperienceProject } from '../types/experience_project.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { AuthService } from '../auth/auth.service';

@Resolver((of) => Cv)
export class CvResolver {
  constructor(private cvService: CvService, private authService: AuthService) {}

  @UseGuards(new AuthGuard())
  @Query((_returns) => Cv)
  async getOneCv(
    @Args('cv_id') cv_id: number,
    @Context() ctx: any,
  ): Promise<Cv> {
    const { id, email } = ctx.user;
    try {
      const checkPermission = await this.authService.isAdmin({ id, email });
      if (checkPermission.isAdmin) {
        const { cv } = await this.cvService.getCvById(cv_id);
        return cv;
      }
      const { cv } = await this.cvService.getCvByCvIdAndUserId(cv_id, id);
      return cv;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(new AuthGuard())
  @Mutation((_returns) => Cv)
  async createCv(
    @Args('inputCreateCv') inputCreateCv: InputCreateCvRequest,
    @Context() ctx: any,
  ): Promise<Cv> {
    try {
      inputCreateCv.userId = ctx.user.id;
      const { cv } = await this.cvService.createCv(inputCreateCv);
      return cv;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @ResolveField('educationCertifications', (_returns) => [
    EducationCertification,
  ])
  async educationCertifications(
    @Parent() cv: Cv,
  ): Promise<EducationCertification[]> {
    const cvId = cv.id;
    try {
      const ed = await this.cvService.findEducationCertificationsByCvId(cvId);
      return ed.data ? ed.data : [];
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @ResolveField('workExperiences', (_returns) => [WorkExperience])
  async workExperiences(@Parent() cv: Cv): Promise<WorkExperience[]> {
    const cvId = cv.id;
    try {
      const ed = await this.cvService.findWorkExperiencesByCvId(cvId);
      return ed.data ? ed.data : [];
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @ResolveField('experienceProjects', (_returns) => [ExperienceProject])
  async experienceProjects(@Parent() cv: Cv): Promise<ExperienceProject[]> {
    const cvId = cv.id;
    try {
      const ed = await this.cvService.findExperienceProjectsByCvId(cvId);
      return ed.data ? ed.data : [];
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
