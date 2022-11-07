import { Field, ObjectType, registerEnumType, Int } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 1,
  USER = 2,
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
export class User {
  @Field((_type) => Int)
  id: number;

  @Field()
  email: string;

  @Field((_type) => String)
  username: string;

  @Field((_type) => Int)
  age: number;

  @Field((_type) => UserRole)
  role: UserRole = UserRole.USER;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
