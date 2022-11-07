import { Entity, OneToMany, Property, Collection } from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { EducationCertification } from './education_certification.entity';
import { ExperienceProject } from './experience_project.entity';
import { WorkExperience } from './work_experience.entity';

@Entity({ tableName: 'cvs' })
export class Cv extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  gender!: string;

  @Property()
  nationality!: string;

  @Property({
    type: 'longtext',
  })
  objective: string;

  @Property({
    type: 'longtext',
  })
  summary: string;

  @Property({
    default: false,
  })
  isDeleted: boolean;

  @Property({
    nullable: false,
  })
  userId!: number;

  @OneToMany(() => EducationCertification, (e_c) => e_c.cv)
  educationCertifications = new Collection<EducationCertification>(this);

  @OneToMany(() => ExperienceProject, (e_p) => e_p.cv)
  experienceProjects = new Collection<ExperienceProject>(this);

  @OneToMany(() => WorkExperience, (w_e) => w_e.cv)
  workExperiences = new Collection<WorkExperience>(this);

  constructor(
    name: string,
    gender: string,
    nationality: string,
    objective: string,
    summary: string,
    userId: number,
  ) {
    super();
    this.name = name;
    this.nationality = nationality;
    this.gender = gender;
    this.objective = objective;
    this.summary = summary;
    this.userId = userId;
  }
}
