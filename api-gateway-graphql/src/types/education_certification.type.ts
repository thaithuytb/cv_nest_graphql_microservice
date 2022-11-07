import { Field, ObjectType, Int, InputType } from '@nestjs/graphql';
import { Cv } from './cv.type';

@ObjectType()
export class EducationCertification {
  @Field((_type) => Int)
  id: number;

  @Field((_type) => String)
  name: string;

  @Field((_type) => String)
  time: string;

  @Field((_type) => String)
  major: string;

  @Field((_type) => Boolean)
  isDeleted: boolean;

  @Field((_type) => Cv)
  cv: Cv;
}
