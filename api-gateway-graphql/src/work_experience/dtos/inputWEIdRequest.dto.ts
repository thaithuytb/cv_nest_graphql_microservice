import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class InputWEIdRequest {
  @Field((_type) => Int)
  @IsNumber()
  weId: number;
}
