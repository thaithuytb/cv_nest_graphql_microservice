import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { Cv } from './cv.entity';
import { WorkExperience } from './work_experience.entity';

@Entity({ tableName: 'experience_projects' })
export class ExperienceProject extends BaseEntity {
  @Property()
  name: string;

  @Property({
    length: 50,
  })
  time: string;

  @Property({
    length: 200,
  })
  project_description: string;

  @Property({
    length: 100,
  })
  role: string;

  @Property({
    length: 200,
  })
  responsibilities: string;

  @Property({
    length: 200,
  })
  programming_languages: string;

  @Property({
    default: false,
  })
  isDeleted: boolean;

  @ManyToOne({
    entity: () => Cv,
  })
  cv!: Cv;

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
