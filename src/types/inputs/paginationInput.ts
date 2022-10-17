import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field((_type) => Int, { defaultValue: 3 })
  @IsNumber()
  take!: number;

  @Field((_type) => Int, { defaultValue: 0 })
  @IsNumber()
  skip!: number;
}
