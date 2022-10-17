import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateWorkExperienceInput } from '../../work_experiences/dto/createWE_input.dto';

@InputType()
export class CreateExperienceProjectInput {
  @Field()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsNotEmpty()
  time!: string;

  @Field()
  @IsNotEmpty()
  project_description!: string;

  @Field()
  @IsNotEmpty()
  role!: string;

  @Field()
  @IsNotEmpty()
  responsibilities!: string;

  @Field()
  @IsNotEmpty()
  programming_languages!: string;

  @Field((_type) => CreateWorkExperienceInput, { nullable: true })
  workExperience: CreateWorkExperienceInput;
}
