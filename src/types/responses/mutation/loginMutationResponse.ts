import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './../../../entities';

@ObjectType()
export class LoginMutationResponse {
  @Field((_type) => User)
  user: User;

  @Field((_type) => String)
  token: string;
}
