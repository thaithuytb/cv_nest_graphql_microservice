import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './customBaseEntity';
import { Cv } from './cv.entity';

@Entity({ tableName: 'education_certifications' })
@ObjectType()
export class EducationCertification extends CustomBaseEntity {
  @Property()
  @Field()
  name: string;

  @Property({
    length: 50,
  })
  @Field()
  time: string;

  @Property({
    length: 50,
  })
  @Field()
  major: string;

  @Property({
    default: false,
  })
  @Field()
  isDeleted: boolean;

  @Field((_type) => Cv)
  @ManyToOne({
    entity: () => Cv,
  })
  cv!: Cv;

  constructor(name: string, time: string) {
    super();
    this.name = name;
    this.time = time;
  }
}
