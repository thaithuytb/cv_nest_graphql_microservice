import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateWorkExperienceInput {
  @Field()
  @IsNotEmpty()
  job_title!: string;

  @Field()
  @IsNotEmpty()
  job_description!: string;

  @Field()
  @IsNotEmpty()
  time!: string;

  @Field({ nullable: true })
  company?: string;
}
