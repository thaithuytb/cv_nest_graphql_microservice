import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { WorkExperience, ExperienceProject } from '../entities';
import { WorkExperiencesService } from './work_experiences.service';
import { AuthGuard } from '../guards/auth.guard';
import { CreateWorkExperienceInput } from './dto/createWE_input.dto';
import resolveError from '../errors/error';

@Resolver((of) => WorkExperience)
export class WorkExperiencesResolver {
  constructor(
    private readonly workExperiencesService: WorkExperiencesService,
  ) {}

  @Mutation((_return) => WorkExperience)
  @UseGuards(new AuthGuard())
  async createWorkExperience(
    @Args('createWEInput') createWEInput: CreateWorkExperienceInput,
    @Args('cv_id') cv_id: number,
    @Context() ctx: any,
  ) {
    try {
      const cv = await this.workExperiencesService.getCvByUserIdAndCvId(
        cv_id,
        ctx.user.id,
      );
      return await this.workExperiencesService.createWorkExperience(
        createWEInput,
        cv,
      );
    } catch (error) {
      resolveError(error);
    }
  }

  @ResolveField('experienceProjects', (_returns) => [ExperienceProject])
  async experienceProjects(@Parent() workExperience: WorkExperience) {
    const { id } = workExperience;
    return await this.workExperiencesService.getExperienceProjectsByWEId(id);
  }
}
