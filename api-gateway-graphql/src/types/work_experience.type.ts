import { Field, ObjectType, Int, InputType } from '@nestjs/graphql';
import { Cv } from './cv.type';

@ObjectType()
export class WorkExperience {
  @Field((_type) => Int)
  id: number;

  @Field()
  time: string;

  @Field()
  company: string;

  @Field()
  jobTitle: string;

  @Field()
  jobDescription: string;

  @Field((_type) => Boolean)
  isDeleted: boolean;

  @Field((_type) => Cv)
  cv: Cv;
}
