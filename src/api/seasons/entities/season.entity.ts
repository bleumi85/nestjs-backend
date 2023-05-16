import { Collection, Entity, EntityRepositoryType, ManyToMany, OneToMany, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryEntity } from '../../../common/entities';
import { Account } from '../../accounts/entities';
import { SeasonRepository } from '../seasons.repository';
import { Payment } from '../../payments/entities';

@Entity({tableName: 'seasons', customRepository: () => SeasonRepository })
export class Season extends PrimaryEntity {
    [EntityRepositoryType]?: SeasonRepository;

    @Property()
    @ApiProperty()
    year: number;

    @Property()
    @ApiProperty()
    description: string;

    @Property({ default: false })
    @ApiProperty()
    isActive = false;

    @ManyToMany(() => Account, account => account.seasons)
    accounts = new Collection<Account>(this);

    @OneToMany(() => Payment, p=> p.season)
    payments = new Collection<Payment>(this);
}