import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Account } from '../../accounts/entities';
import { PrimaryEntity } from '../../../common/entities';

@Entity({ tableName: 'refresh_tokens' })
export class RefreshToken extends PrimaryEntity {
    @ManyToOne(() => Account)
    account: Account;

    @Property()
    token: string;

    @Property({ type: 'datetime' })
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

    constructor(account: Account, token: string, createdByIp: string) {
        super();
        this.account = account;
        this.token = token;
        this.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        this.createdByIp = createdByIp;
        this.created = new Date();
    }
}
