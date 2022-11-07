import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { WorkExperience } from '../types/work_experience.type';
import { WorkExperienceService } from './work_experience.service';
import { RpcException } from '@nestjs/microservices';
import { ExperienceProject } from '../types/experience_project.type';
import { ExperienceProjectService } from '../experience_project/experience_project.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';

@Resolver((of) => WorkExperience)
export class WorkExperienceResolver {
  constructor(
    private weService: WorkExperienceService,
    private epService: ExperienceProjectService,
  ) {}

  @UseGuards(new AuthGuard())
  @Query((_returns) => [WorkExperience] || [])
  async findWes(@Args('cvId') cvId: number): Promise<[WorkExperience] | []> {
    try {
      const ed = await this.weService.findWEs(cvId);
      return ed.data ? ed.data : [];
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @ResolveField('experienceProjects', (_returns) => [ExperienceProject])
  async educationCertifications(
    @Parent() we: WorkExperience,
  ): Promise<ExperienceProject[]> {
    const { id } = we;
    try {
      const eP = await this.epService.findEpsByWEId(id);
      return eP.data ? eP.data : [];
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
