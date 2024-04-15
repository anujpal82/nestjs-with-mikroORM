import { Migration } from '@mikro-orm/migrations';

export class Migration20240411082419 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "movie" alter column "id" drop default;');
    this.addSql('alter table "movie" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "movie" alter column "id" drop default;');

    this.addSql('alter table "show" alter column "id" drop default;');
    this.addSql('alter table "show" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "show" alter column "movie_id" drop default;');
    this.addSql('alter table "show" alter column "movie_id" type uuid using ("movie_id"::text::uuid);');
    this.addSql('alter table "show" alter column "id" drop default;');

    this.addSql('alter table "user" alter column "id" drop default;');
    this.addSql('alter table "user" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "user" alter column "id" drop default;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "movie" alter column "id" type text using ("id"::text);');

    this.addSql('alter table "show" alter column "id" type text using ("id"::text);');
    this.addSql('alter table "show" alter column "movie_id" type text using ("movie_id"::text);');

    this.addSql('alter table "user" alter column "id" type text using ("id"::text);');

    this.addSql('alter table "movie" alter column "id" type int using ("id"::int);');
    this.addSql('create sequence if not exists "movie_id_seq";');
    this.addSql('select setval(\'movie_id_seq\', (select max("id") from "movie"));');
    this.addSql('alter table "movie" alter column "id" set default nextval(\'movie_id_seq\');');

    this.addSql('alter table "show" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "show" alter column "movie_id" type int using ("movie_id"::int);');
    this.addSql('create sequence if not exists "show_id_seq";');
    this.addSql('select setval(\'show_id_seq\', (select max("id") from "show"));');
    this.addSql('alter table "show" alter column "id" set default nextval(\'show_id_seq\');');

    this.addSql('alter table "user" alter column "id" type int using ("id"::int);');
    this.addSql('create sequence if not exists "user_id_seq";');
    this.addSql('select setval(\'user_id_seq\', (select max("id") from "user"));');
    this.addSql('alter table "user" alter column "id" set default nextval(\'user_id_seq\');');
  }

}
