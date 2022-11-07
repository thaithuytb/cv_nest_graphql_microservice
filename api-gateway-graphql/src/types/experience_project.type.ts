import { Field, ObjectType, Int, InputType } from '@nestjs/graphql';
import { Cv } from './cv.type';
import { WorkExperience } from './work_experience.type';

@ObjectType()
export class ExperienceProject {
  @Field((_type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  time: string;

  @Field()
  projectDescription: string;

  @Field()
  role: string;

  @Field()
  responsibilities: string;

  @Field()
  programmingLanguages: string;

  @Field((_type) => Boolean)
  isDeleted: boolean;

  @Field((_type) => Cv)
  cv: Cv;

  @Field((_type) => WorkExperience)
  workExperience: WorkExperience;
}
