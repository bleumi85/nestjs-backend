import { Migration } from '@mikro-orm/migrations';

export class Migration20230516125414_Create_SeasonPlace extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "season_places" ("id" uuid not null default gen_random_uuid(), "place" int not null, "percentage" int not null, "season_id" uuid not null, constraint "season_places_pkey" primary key ("id"));');
    this.addSql('alter table "season_places" add constraint "place_per_season_unique" unique ("season_id", "place");');

    this.addSql('alter table "season_places" add constraint "season_places_season_id_foreign" foreign key ("season_id") references "seasons" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "season_places" cascade;');
  }

}
