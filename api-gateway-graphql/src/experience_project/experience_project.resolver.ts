import { Args, Query, Resolver } from '@nestjs/graphql';
import { ExperienceProject } from '../types/experience_project.type';
import { ExperienceProjectService } from './experience_project.service';
import { RpcException } from '@nestjs/microservices';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';

@Resolver((of) => ExperienceProject)
export class ExperienceProjectResolver {
  constructor(private epService: ExperienceProjectService) {}

  @UseGuards(new AuthGuard())
  @Query((_returns) => [ExperienceProject] || [])
  async findEps(@Args('cvId') cvId: number): Promise<[ExperienceProject] | []> {
    try {
      const ed = await this.epService.findEps(cvId);
      return ed.data ? ed.data : [];
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
