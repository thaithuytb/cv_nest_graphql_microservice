import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ExperienceProject } from 'src/entities';
import { AuthGuard } from '../guards/auth.guard';
import { ExperienceProjectsService } from './experience_projects.service';
import { CreateExperienceProjectInput } from './dto/createEP_input.dto';
import resolveError from '../errors/error';

@Resolver((of) => ExperienceProject)
export class ExperienceProjectsResolver {
  constructor(
    private readonly experienceProjectsService: ExperienceProjectsService,
  ) {}

  @Mutation((_return) => ExperienceProject)
  @UseGuards(new AuthGuard())
  async createExperienceProject(
    @Args('createEPInput') createEPInput: CreateExperienceProjectInput,
    @Args('cv_id') cv_id: number,
    @Args('work_experience_id') work_experience_id: number,
    @Context() ctx: any,
  ) {
    try {
      const cv = await this.experienceProjectsService.getCvByUserIdAndCvId(
        cv_id,
        ctx.user.id,
      );
      const w_e =
        await this.experienceProjectsService.getWorkExperienceByIdAndCvId(
          work_experience_id,
          cv_id,
        );

      return await this.experienceProjectsService.createExperienceProject(
        createEPInput,
        cv,
        w_e,
      );
    } catch (error) {
      resolveError(error);
    }
  }
}
