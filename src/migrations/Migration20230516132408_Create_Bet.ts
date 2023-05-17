import { Migration } from '@mikro-orm/migrations';

export class Migration20230516132408_Create_Bet extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "bets" ("id" uuid not null default gen_random_uuid(), "points" int not null, "missed" int not null, "is_max" boolean not null default false, "season_gameday_id" uuid not null, "account_id" uuid not null, constraint "bets_pkey" primary key ("id"));',
        );
        this.addSql(
            'alter table "bets" add constraint "bets_season_gameday_id_account_id_unique" unique ("season_gameday_id", "account_id");',
        );

        this.addSql(
            'alter table "bets" add constraint "bets_season_gameday_id_foreign" foreign key ("season_gameday_id") references "seasons_gamedays" ("id") on update cascade;',
        );
        this.addSql(
            'alter table "bets" add constraint "bets_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade;',
        );
    }

    async down(): Promise<void> {
        this.addSql('drop table if exists "bets" cascade;');
    }
}
