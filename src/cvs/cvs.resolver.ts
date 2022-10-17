import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CvsService } from './cvs.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateCvInput } from './dto/createCv_input.dto';
import { EducationCertification } from '../entities/education_certification.entity';
import { WorkExperience, ExperienceProject, Cv, UserRole } from '../entities';
import { PaginationInput } from '../types/inputs/paginationInput';
import { QueryCvsInput } from '../types/inputs/queryCvsInput';

@Resolver((of) => Cv)
export class CvsResolver {
  constructor(private cvsService: CvsService) {}

  @Mutation((_returns) => Cv)
  @UseGuards(new AuthGuard())
  async createCv(
    @Context() ctx: any,
    @Args('createCvInput') createCvInput: CreateCvInput,
  ) {
    const user = await this.cvsService.getUserByEmail(ctx.user.email);
    return await this.cvsService.createCv(createCvInput, user);
  }

  @Query((_returns) => Cv)
  @UseGuards(new AuthGuard())
  async getCv(@Args('cv_id') cv_id: number, @Context() ctx: any) {
    const user = await this.cvsService.getUserByEmail(ctx.user.email);
    return await this.cvsService.getCv(cv_id, user);
  }

  @Query((_returns) => [Cv])
  @UseGuards(new AuthGuard())
  async getCvs(
    @Context() ctx: any,
    @Args('paginationInput') paginationInput?: PaginationInput,
    @Args('q') q?: QueryCvsInput,
  ) {
    const user = await this.cvsService.getUserByEmail(ctx.user.email);
    return this.cvsService.getCvs(
      user.role === UserRole.ADMIN ? null : user.id,
      paginationInput,
      q,
    );
  }

  @ResolveField('educationCertifications', (_returns) => [
    EducationCertification,
  ])
  async educationCertifications(@Parent() cv: Cv) {
    const { id } = cv;
    return await this.cvsService.getEducationCertifications(id);
  }

  @ResolveField('workExperiences', (_returns) => [WorkExperience])
  async workExperiences(@Parent() cv: Cv) {
    const { id } = cv;
    return await this.cvsService.getWorkExperiences(id);
  }

  @ResolveField('experienceProjects', (_returns) => [ExperienceProject])
  async experienceProjects(@Parent() cv: Cv) {
    const { id } = cv;
    return await this.cvsService.getExperienceProjects(id);
  }
}
