import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class QueryCvsInput {
  @Field({ nullable: true })
  name?: string;

  @Field((_type) => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  company?: string;

  @Field({ nullable: true })
  programming_languages?: string;
}
