import { Args, Query, Resolver } from '@nestjs/graphql';
import { EducationCertificationService } from './education_certification.service';
import { EducationCertification } from '../types/education_certification.type';
import { RpcException } from '@nestjs/microservices';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';

@Resolver((of) => EducationCertification)
export class EducationCertificationResolver {
  constructor(private ecService: EducationCertificationService) {}

  @UseGuards(new AuthGuard())
  @Query((_returns) => [EducationCertification] || [])
  async findEcs(
    @Args('cvId') cvId: number,
  ): Promise<[EducationCertification] | []> {
    try {
      const ed = await this.ecService.findEcs(cvId);
      return ed.data ? ed.data : [];
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
