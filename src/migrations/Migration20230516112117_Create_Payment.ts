import { Migration } from '@mikro-orm/migrations';

export class Migration20230516112117_Create_Payment extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "payment_types" ("id" uuid not null default gen_random_uuid(), "title" varchar(255) not null, "text_positive" varchar(255) null, "text_negative" varchar(255) null, constraint "payment_types_pkey" primary key ("id"));');
    this.addSql('alter table "payment_types" add constraint "payment_types_title_unique" unique ("title");');

    this.addSql('create table "payments" ("id" uuid not null default gen_random_uuid(), "booked" timestamptz(0) not null, "amount" numeric(10,2) not null, "account_id" uuid not null, "payment_type_id" uuid not null, "season_id" uuid not null, constraint "payments_pkey" primary key ("id"));');

    this.addSql('alter table "payments" add constraint "payments_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade;');
    this.addSql('alter table "payments" add constraint "payments_payment_type_id_foreign" foreign key ("payment_type_id") references "payment_types" ("id") on update cascade;');
    this.addSql('alter table "payments" add constraint "payments_season_id_foreign" foreign key ("season_id") references "seasons" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "payments" drop constraint "payments_payment_type_id_foreign";');

    this.addSql('drop table if exists "payment_types" cascade;');

    this.addSql('drop table if exists "payments" cascade;');
  }

}
