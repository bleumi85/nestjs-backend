import { Migration } from '@mikro-orm/migrations';

export class Migration20230516102859_Create_Season extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "seasons" ("id" uuid not null default gen_random_uuid(), "year" int not null, "description" varchar(255) not null, "is_active" boolean not null default false, constraint "seasons_pkey" primary key ("id"));',
        );

        this.addSql(
            'create table "accounts_seasons" ("account_id" uuid not null, "season_id" uuid not null, constraint "accounts_seasons_pkey" primary key ("account_id", "season_id"));',
        );

        this.addSql(
            'alter table "accounts_seasons" add constraint "accounts_seasons_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade on delete cascade;',
        );
        this.addSql(
            'alter table "accounts_seasons" add constraint "accounts_seasons_season_id_foreign" foreign key ("season_id") references "seasons" ("id") on update cascade on delete cascade;',
        );
    }

    async down(): Promise<void> {
        this.addSql(
            'alter table "accounts_seasons" drop constraint "accounts_seasons_season_id_foreign";',
        );

        this.addSql('drop table if exists "seasons" cascade;');

        this.addSql('drop table if exists "accounts_seasons" cascade;');
    }
}
