import { Migration } from '@mikro-orm/migrations';

export class Migration20240412103955 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "ticket" ("id" uuid not null, "created_at" timestamptz not null, "show_id" uuid not null, "user_id" uuid not null, "updated_at" timestamptz not null, constraint "ticket_pkey" primary key ("id"));');

    this.addSql('alter table "ticket" add constraint "ticket_show_id_foreign" foreign key ("show_id") references "show" ("id") on update cascade;');
    this.addSql('alter table "ticket" add constraint "ticket_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
