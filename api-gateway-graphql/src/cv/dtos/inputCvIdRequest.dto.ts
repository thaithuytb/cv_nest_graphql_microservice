import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class InputCvIdRequest {
  @Field((_type) => Int)
  @IsNumber()
  cvId: number;
}
