import { Migration } from '@mikro-orm/migrations';

export class Migration20240410094047 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "movie" ("id" serial primary key, "show_name" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);',
    );
  }
}

