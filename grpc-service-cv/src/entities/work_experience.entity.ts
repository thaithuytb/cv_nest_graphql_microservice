import {
  Entity,
  ManyToOne,
  Property,
  Collection,
  OneToMany,
} from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { Cv } from './cv.entity';
import { ExperienceProject } from './experience_project.entity';

@Entity({ tableName: 'work_experiences' })
export class WorkExperience extends BaseEntity {
  @Property({
    length: 50,
  })
  time: string;

  @Property({
    length: 50,
  })
  company: string;

  @Property({
    length: 200,
  })
  job_title: string;

  @Property({
    length: 200,
  })
  job_description: string;

  @Property({
    default: false,
  })
  isDeleted: boolean;

  @ManyToOne({
    entity: () => Cv,
  })
  cv!: Cv;

  @OneToMany(() => ExperienceProject, (e_p) => e_p.workExperience)
  experienceProjects = new Collection<ExperienceProject>(this);

  constructor(
    time: string,
    company: string,
    job_title: string,
    job_description: string,
  ) {
    super();
    this.time = time;
    this.company = company;
    this.job_title = job_title;
    this.job_description = job_description;
  }
}
