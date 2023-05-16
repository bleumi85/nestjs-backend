import { Collection, Entity, EntityRepositoryType, ManyToMany, OneToMany, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryEntity } from '../../../common/entities';
import { Account } from '../../accounts/entities';
import { SeasonRepository } from '../seasons.repository';
import { Payment } from '../../payments/entities';
import { SeasonPlace } from '../season-places/entities';
import { SeasonGameday } from '../../seasons-gamedays/entities';

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

    @OneToMany(() => SeasonPlace, sp => sp.season)
    seasonPlaces = new Collection<SeasonPlace>(this);

    @OneToMany(() => SeasonGameday, sg => sg.season)
    seasonGamedays = new Collection<SeasonGameday>(this);
}