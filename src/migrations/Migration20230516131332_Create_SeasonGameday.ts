import { Migration } from '@mikro-orm/migrations';

export class Migration20230516131332_Create_SeasonGameday extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "seasons_gamedays" ("id" uuid not null default gen_random_uuid(), "season_id" uuid not null, "gameday_id" uuid not null, "date_start" timestamptz(0) not null, "date_end" timestamptz(0) not null, constraint "seasons_gamedays_pkey" primary key ("id"));');
    this.addSql('alter table "seasons_gamedays" add constraint "seasons_gamedays_always_unique" unique ("season_id", "gameday_id");');

    this.addSql('alter table "seasons_gamedays" add constraint "seasons_gamedays_season_id_foreign" foreign key ("season_id") references "seasons" ("id") on update cascade;');
    this.addSql('alter table "seasons_gamedays" add constraint "seasons_gamedays_gameday_id_foreign" foreign key ("gameday_id") references "gamedays" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "seasons_gamedays" cascade;');
  }

}
