import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class InputCreateEducationCertification {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  time: string;

  @Field({ nullable: true })
  major: string;
}

@InputType()
export class InputCreateWorkExperience {
  @Field({ nullable: true })
  time: string;

  @Field()
  company!: string;

  @Field({ nullable: true })
  jobTitle: string;

  @Field({ nullable: true })
  jobDescription: string;
}

@InputType()
export class InputCreateExperienceProject {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  time: string;

  @Field({ nullable: true })
  projectDescription: string;

  @Field({ nullable: true })
  role: string;

  @Field({ nullable: true })
  responsibilities: string;

  @Field({ nullable: true })
  programmingLanguages: string;

  @Field((_type) => InputCreateWorkExperience)
  workExperience: InputCreateWorkExperience;
}

@InputType()
export class InputCreateCvRequest {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  gender: string;

  @Field()
  @IsNotEmpty()
  nationality: string;

  @Field({ nullable: true })
  objective: string;

  @Field({ nullable: true })
  summary: string;

  userId: number;

  @Field((_type) => [InputCreateEducationCertification], { nullable: true })
  educationCertifications: [InputCreateEducationCertification];

  @Field((_type) => [InputCreateWorkExperience], { nullable: true })
  workExperiences: [InputCreateWorkExperience];

  @Field((_type) => [InputCreateExperienceProject], { nullable: true })
  experienceProjects: [InputCreateExperienceProject];
}
