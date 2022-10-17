import { Migration } from '@mikro-orm/migrations';

export class Migration20221016095228 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "curriculum_vitaes" add column "is_deleted" boolean not null default false;');

    this.addSql('alter table "education_certifications" add column "is_deleted" boolean not null default false;');

    this.addSql('alter table "work_experiences" add column "is_deleted" boolean not null default false;');

    this.addSql('alter table "experience_projects" add column "is_deleted" boolean not null default false;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "curriculum_vitaes" drop column "is_deleted";');

    this.addSql('alter table "education_certifications" drop column "is_deleted";');

    this.addSql('alter table "work_experiences" drop column "is_deleted";');

    this.addSql('alter table "experience_projects" drop column "is_deleted";');
  }

}
