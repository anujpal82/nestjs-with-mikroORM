import { Migration } from '@mikro-orm/migrations';

export class Migration20240412075804 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "show" add column "price" int not null;');
  }

}
