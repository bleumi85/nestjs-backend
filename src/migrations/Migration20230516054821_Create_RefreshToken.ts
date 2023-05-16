import { Migration } from '@mikro-orm/migrations';

export class Migration20230516054821_Create_RefreshToken extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "refresh_tokens" ("id" uuid not null default gen_random_uuid(), "account_id" uuid not null, "token" varchar(255) not null, "expires" timestamptz(0) not null, "created" timestamptz(0) not null, "created_by_ip" varchar(255) not null, "revoked" timestamptz(0) null, "revoked_by_ip" varchar(255) null, "replaced_by_token" varchar(255) null, "reason_revoked" varchar(255) null, constraint "refresh_tokens_pkey" primary key ("id"));',
        );

        this.addSql(
            'alter table "refresh_tokens" add constraint "refresh_tokens_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade;',
        );
    }

    async down(): Promise<void> {
        this.addSql('drop table if exists "refresh_tokens" cascade;');
    }
}
