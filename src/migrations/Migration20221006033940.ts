import { Migration } from '@mikro-orm/migrations';

export class Migration20221006033940 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "curriculum_vitaes" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "nationality" varchar(255) not null);',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "curriculum_vitaes" cascade;');
  }
}
