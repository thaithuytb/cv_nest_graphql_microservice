import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { EducationCertification } from '../entities/education_certification.entity';
import { EducationCertificationsService } from './education_certifications.service';
import { CreateEducationCertificationInput } from './dto/createEC_input.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import resolveError from '../errors/error';

@Resolver((of) => EducationCertification)
export class EducationCertificationsResolver {
  constructor(
    private readonly educationCertificationsService: EducationCertificationsService,
  ) {}

  @Mutation((_returns) => EducationCertification)
  @UseGuards(new AuthGuard())
  async createEducationCertification(
    @Args('createECInput') createECInput: CreateEducationCertificationInput,
    @Args('cv_id') cv_id: number,
    @Context() ctx: any,
  ) {
    try {
      const cv =
        await this.educationCertificationsService.findCvByUserIdAndCvId(
          cv_id,
          ctx.user.id,
        );
      return await this.educationCertificationsService.createEducationCertification(
        createECInput,
        cv,
      );
    } catch (error) {
      resolveError(error);
    }
  }
}
