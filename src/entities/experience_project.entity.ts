import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { CustomBaseEntity } from './customBaseEntity';
import { Cv } from './cv.entity';
import { WorkExperience } from './work_experience.entity';

@Entity({ tableName: 'experience_projects' })
@ObjectType()
export class ExperienceProject extends CustomBaseEntity {
  @Property()
  @Field()
  name: string;

  @Property({
    length: 50,
  })
  @Field()
  time: string;

  @Property({
    length: 200,
  })
  @Field()
  project_description: string;

  @Property({
    length: 100,
  })
  @Field()
  role: string;

  @Property({
    length: 200,
  })
  @Field()
  responsibilities: string;

  @Property({
    length: 200,
  })
  @Field()
  programming_languages: string;

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

  @Field((_type) => WorkExperience)
  @ManyToOne({
    entity: () => WorkExperience,
  })
  workExperience!: WorkExperience;

  constructor(
    name: string,
    time: string,
    project_description: string,
    role: string,
    responsibilities: string,
    programming_languages: string,
  ) {
    super();
    this.name = name;
    this.time = time;
    this.project_description = project_description;
    this.role = role;
    this.responsibilities = responsibilities;
    this.programming_languages = programming_languages;
  }
}
