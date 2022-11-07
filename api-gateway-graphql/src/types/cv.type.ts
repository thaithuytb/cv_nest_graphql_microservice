import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Cv {
  @Field((_type) => Int)
  id: number;

  @Field()
  name!: string;

  @Field()
  gender!: string;

  @Field()
  nationality!: string;

  @Field()
  objective: string;

  @Field()
  summary: string;

  @Field((_type) => Boolean)
  isDeleted: boolean;

  @Field((_type) => Int)
  userId!: number;
}
