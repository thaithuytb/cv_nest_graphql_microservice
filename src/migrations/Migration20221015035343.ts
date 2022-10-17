import { Migration } from '@mikro-orm/migrations';

export class Migration20221015035343 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "education_certifications" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "time" varchar(50) not null, "major" varchar(50) not null, "cv_id" int not null);');

    this.addSql('create table "work_experiences" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "time" varchar(50) not null, "company" varchar(50) not null, "job_title" varchar(200) not null, "job_description" varchar(200) not null, "cv_id" int not null);');

    this.addSql('create table "experience_projects" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "time" varchar(50) not null, "project_description" varchar(200) not null, "role" varchar(100) not null, "responsibilities" varchar(200) not null, "programming_languages" varchar(200) not null, "cv_id" int not null, "work_experience_id" int not null);');

    this.addSql('alter table "education_certifications" add constraint "education_certifications_cv_id_foreign" foreign key ("cv_id") references "curriculum_vitaes" ("id") on update cascade;');

    this.addSql('alter table "work_experiences" add constraint "work_experiences_cv_id_foreign" foreign key ("cv_id") references "curriculum_vitaes" ("id") on update cascade;');

    this.addSql('alter table "experience_projects" add constraint "experience_projects_cv_id_foreign" foreign key ("cv_id") references "curriculum_vitaes" ("id") on update cascade;');
    this.addSql('alter table "experience_projects" add constraint "experience_projects_work_experience_id_foreign" foreign key ("work_experience_id") references "work_experiences" ("id") on update cascade;');

    this.addSql('alter table "users" add column "age" int not null default 18;');

    this.addSql('alter table "curriculum_vitaes" add column "gender" varchar(255) not null, add column "objective" varchar(255) not null, add column "summary" varchar(255) not null, add column "user_id" int not null;');
    this.addSql('alter table "curriculum_vitaes" add constraint "curriculum_vitaes_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "experience_projects" drop constraint "experience_projects_work_experience_id_foreign";');

    this.addSql('drop table if exists "education_certifications" cascade;');

    this.addSql('drop table if exists "work_experiences" cascade;');

    this.addSql('drop table if exists "experience_projects" cascade;');

    this.addSql('alter table "curriculum_vitaes" drop constraint "curriculum_vitaes_user_id_foreign";');

    this.addSql('alter table "curriculum_vitaes" drop column "gender";');
    this.addSql('alter table "curriculum_vitaes" drop column "objective";');
    this.addSql('alter table "curriculum_vitaes" drop column "summary";');
    this.addSql('alter table "curriculum_vitaes" drop column "user_id";');

    this.addSql('alter table "users" drop column "age";');
  }

}
