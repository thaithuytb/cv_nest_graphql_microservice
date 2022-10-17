import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class InfoUserInput {
  @Field()
  username?: string;

  @Field((_type) => Int)
  age?: number;
}
