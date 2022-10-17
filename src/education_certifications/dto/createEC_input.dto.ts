import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateEducationCertificationInput {
  @Field()
  @IsNotEmpty()
  name!: string;

  @Field()
  time!: string;

  @Field({ nullable: true })
  major?: string;
}
