import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  Collection,
} from '@mikro-orm/core';
import { CustomBaseEntity } from './customBaseEntity';
import { User } from './user.entity';
import { EducationCertification } from './education_certification.entity';
import { ExperienceProject } from './experience_project.entity';
import { WorkExperience } from './work_experience.entity';

@Entity({ tableName: 'curriculum_vitaes' })
@ObjectType()
export class Cv extends CustomBaseEntity {
  @Property()
  @Field()
  name!: string;

  @Property()
  @Field((_type) => String)
  gender!: string;

  @Property()
  @Field((_type) => String)
  nationality!: string;

  @Property({
    type: 'longtext',
  })
  @Field((_type) => String)
  objective: string;

  @Property({
    type: 'longtext',
  })
  @Field((_type) => String)
  summary: string;

  @Property({
    default: false,
  })
  @Field()
  isDeleted: boolean;

  @ManyToOne({
    entity: () => User,
  })
  @Field((_type) => User)
  user!: User;

  @Field((_type) => [EducationCertification])
  @OneToMany(() => EducationCertification, (e_c) => e_c.cv)
  educationCertifications = new Collection<EducationCertification>(this);

  @Field((_type) => [ExperienceProject])
  @OneToMany(() => ExperienceProject, (e_p) => e_p.cv)
  experienceProjects = new Collection<ExperienceProject>(this);

  @Field((_type) => [WorkExperience])
  @OneToMany(() => WorkExperience, (w_e) => w_e.cv)
  workExperiences = new Collection<WorkExperience>(this);

  constructor(name: string, nationality: string, gender: string) {
    super();
    this.name = name;
    this.nationality = nationality;
    this.gender = gender;
  }
}
