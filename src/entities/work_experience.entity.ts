import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  ManyToOne,
  Property,
  Collection,
  OneToMany,
} from '@mikro-orm/core';
import { CustomBaseEntity } from './customBaseEntity';
import { Cv } from './cv.entity';
import { ExperienceProject } from './experience_project.entity';

@Entity({ tableName: 'work_experiences' })
@ObjectType()
export class WorkExperience extends CustomBaseEntity {
  @Property({
    length: 50,
  })
  @Field()
  time: string;

  @Property({
    length: 50,
  })
  @Field()
  company: string;

  @Property({
    length: 200,
  })
  @Field()
  job_title: string;

  @Property({
    length: 200,
  })
  @Field()
  job_description: string;

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

  @Field((_type) => [ExperienceProject])
  @OneToMany(() => ExperienceProject, (e_p) => e_p.workExperience)
  experienceProjects = new Collection<ExperienceProject>(this);

  constructor(time: string, job_title: string, job_description: string) {
    super();
    this.time = time;
    this.job_title = job_title;
    this.job_description = job_description;
  }
}
