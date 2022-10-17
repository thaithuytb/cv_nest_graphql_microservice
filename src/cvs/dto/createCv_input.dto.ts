import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateEducationCertificationInput } from '../../education_certifications/dto/createEC_input.dto';
import { CreateWorkExperienceInput } from '../../work_experiences/dto/createWE_input.dto';
import { CreateExperienceProjectInput } from '../../experience_projects/dto/createEP_input.dto';

@InputType()
export class CreateCvInput {
  @Field()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsNotEmpty()
  nationality!: string;

  @Field()
  @IsNotEmpty()
  gender!: string;

  @Field({ nullable: true })
  objective?: string;

  @Field({ nullable: true })
  summary?: string;

  @Field((_type) => [CreateEducationCertificationInput], { nullable: true })
  education_certifications?: [CreateEducationCertificationInput];

  @Field((_type) => [CreateWorkExperienceInput], { nullable: true })
  workExperiences?: [CreateWorkExperienceInput];

  @Field((_type) => [CreateExperienceProjectInput], { nullable: true })
  experienceProjects?: [CreateExperienceProjectInput];
}
