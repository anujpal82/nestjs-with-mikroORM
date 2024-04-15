const { Migration } = require('@mikro-orm/migrations');

export class Migration20240411073617 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "show" ("id" serial primary key, "name" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "movie_id" int not null);');

    this.addSql('alter table "show" add constraint "show_movie_id_foreign" foreign key ("movie_id") references "movie" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "movie" add column "price" int not null;');
  }

}

