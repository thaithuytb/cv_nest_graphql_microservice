import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class InputPermissionRequest {
  @Field((_type) => Int)
  id: number;

  @Field()
  @IsEmail()
  email: string;
}
