import { Property, PrimaryKey } from '@mikro-orm/core';
import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export abstract class CustomBaseEntity {
  @PrimaryKey({
    autoincrement: true,
  })
  @Field((_type) => Int)
  id!: number;

  @Field()
  @Property()
  createdAt: Date = new Date();

  @Field()
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
