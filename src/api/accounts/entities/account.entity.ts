import {
    Cascade,
    Collection,
    Entity,
    EntityRepositoryType,
    Enum,
    ManyToMany,
    OneToMany,
    Property,
    Unique,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { DateEntity } from '../../../common/entities';
import { Role } from '../accounts.interface';
import { RefreshToken } from '../../refresh-tokens/entities';
import { AccountRepository } from '../accounts.repository';
import { Season } from '../../seasons/entities/season.entity';

const roles = Object.values(Role);

@Entity({ tableName: 'accounts', customRepository: () => AccountRepository })
@Unique({
    properties: ['firstName', 'lastName'],
    name: 'accounts_full_name_unique',
})
export class Account extends DateEntity {
    [EntityRepositoryType]?: AccountRepository;

    @Property()
    @ApiProperty()
    firstName: string;

    @Property()
    @ApiProperty()
    lastName: string;

    @Property()
    @Unique()
    @ApiProperty()
    userName: string;

    @Property()
    @Unique()
    @IsEmail()
    @ApiProperty()
    email: string;

    @Enum({ items: () => Role })
    @ApiProperty({ description: `Role is one of [${roles.join(', ')}]` })
    role: Role = Role.VISITOR;

    @Property({ columnType: 'date', nullable: true })
    expirationDate: Date;

    @Property({ hidden: true })
    passwordHash: string;

    @Property({ default: false })
    acceptTerms = false;

    @Property({ nullable: true })
    verificationToken: string;

    @Property({ nullable: true })
    verified: Date;

    @Property({ nullable: true })
    resetToken: string;

    @Property({ nullable: true })
    resetTokenExpires: Date;

    @Property({ nullable: true })
    passwordReset: Date;

    @Property({ persist: false, hidden: true })
    @ApiProperty({ type: Boolean })
    get isVerified() {
        return !!(this.verified || this.passwordReset);
    }

    @OneToMany(() => RefreshToken, (rt) => rt.account, {
        hidden: true,
        cascade: [Cascade.REMOVE],
    })
    refreshTokens = new Collection<RefreshToken>(this);

    @ManyToMany(() => Season)
    seasons = new Collection<Season>(this);
}
