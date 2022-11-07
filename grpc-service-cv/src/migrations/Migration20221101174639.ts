import { Migration } from '@mikro-orm/migrations';

export class Migration20221101174639 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "cvs" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "gender" varchar(255) not null, "nationality" varchar(255) not null, "objective" varchar(255) not null, "summary" varchar(255) not null, "is_deleted" boolean not null default false, "user_id" int not null);');

    this.addSql('create table "education_certifications" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "time" varchar(50) not null, "major" varchar(50) not null, "is_deleted" boolean not null default false, "cv_id" int not null);');

    this.addSql('create table "work_experiences" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "time" varchar(50) not null, "company" varchar(50) not null, "job_title" varchar(200) not null, "job_description" varchar(200) not null, "is_deleted" boolean not null default false, "cv_id" int not null);');

    this.addSql('create table "experience_projects" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "time" varchar(50) not null, "project_description" varchar(200) not null, "role" varchar(100) not null, "responsibilities" varchar(200) not null, "programming_languages" varchar(200) not null, "is_deleted" boolean not null default false, "cv_id" int not null, "work_experience_id" int not null);');

    this.addSql('alter table "education_certifications" add constraint "education_certifications_cv_id_foreign" foreign key ("cv_id") references "cvs" ("id") on update cascade;');

    this.addSql('alter table "work_experiences" add constraint "work_experiences_cv_id_foreign" foreign key ("cv_id") references "cvs" ("id") on update cascade;');

    this.addSql('alter table "experience_projects" add constraint "experience_projects_cv_id_foreign" foreign key ("cv_id") references "cvs" ("id") on update cascade;');
    this.addSql('alter table "experience_projects" add constraint "experience_projects_work_experience_id_foreign" foreign key ("work_experience_id") references "work_experiences" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "education_certifications" drop constraint "education_certifications_cv_id_foreign";');

    this.addSql('alter table "work_experiences" drop constraint "work_experiences_cv_id_foreign";');

    this.addSql('alter table "experience_projects" drop constraint "experience_projects_cv_id_foreign";');

    this.addSql('alter table "experience_projects" drop constraint "experience_projects_work_experience_id_foreign";');

    this.addSql('drop table if exists "cvs" cascade;');

    this.addSql('drop table if exists "education_certifications" cascade;');

    this.addSql('drop table if exists "work_experiences" cascade;');

    this.addSql('drop table if exists "experience_projects" cascade;');
  }

}
