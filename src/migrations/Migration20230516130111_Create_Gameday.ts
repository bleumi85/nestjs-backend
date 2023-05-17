import { Migration } from '@mikro-orm/migrations';

export class Migration20230516130111_Create_Gameday extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "gamedays" ("id" uuid not null default gen_random_uuid(), "title" varchar(255) not null, "order_number" int not null, constraint "gamedays_pkey" primary key ("id"));',
        );
        this.addSql(
            'alter table "gamedays" add constraint "gamedays_title_unique" unique ("title");',
        );
        this.addSql(
            'alter table "gamedays" add constraint "gamedays_order_number_unique" unique ("order_number");',
        );
    }

    async down(): Promise<void> {
        this.addSql('drop table if exists "gamedays" cascade;');
    }
}
