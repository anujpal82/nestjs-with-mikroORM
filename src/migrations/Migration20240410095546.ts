const { Migration } = require('@mikro-orm/migrations');

module.exports= class Migration20240410095546 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "movie" rename column "show_name" to "name";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "movie" rename column "name" to "show_name";');
  }

}
