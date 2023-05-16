import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Account } from "src/api/accounts/entities";
import { PrimaryEntity } from "src/common/entities";

@Entity({ tableName: 'refresh_tokens' })
export class RefreshToken extends PrimaryEntity {
    @ManyToOne(() => Account)
    account: Account;

    @Property()
    token: string;

    @Property({ type: 'datetime'})
    expires: Date;

    @Property({ type: 'datetime' })
    created: Date;

    @Property()
    createdByIp: string;

    @Property({ type: 'datetime', nullable: true })
    revoked: Date;

    @Property({ nullable: true })
    revokedByIp: string;

    @Property({ nullable: true })
    replacedByToken: string;

    @Property({ nullable: true })
    reasonRevoked: string;

    @Property({ persist: false })
    get isExpired(): boolean {
        return new Date() >= this.expires;
    }

    @Property({ persist: false })
    get isRevoked(): boolean {
        return this.revoked !== null;
    }

    @Property({ persist: false })
    get isActive(): boolean {
        return !this.revoked && !this.isExpired;
    }
}