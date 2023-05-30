import { Entity, EntityRepositoryType, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { PrimaryEntity } from '../../../common/entities';
import { ApiProperty } from '@nestjs/swagger';
import { SeasonGameday } from '../../seasons-gamedays/entities';
import { Account } from '../../accounts/entities';
import { BetRepository } from '../bets.repository';

@Entity({ tableName: 'bets', customRepository: () => BetRepository })
@Unique({ properties: ['seasonGameday', 'account'] })
export class Bet extends PrimaryEntity {
    [EntityRepositoryType]?: BetRepository;

    @Property()
    @ApiProperty()
    points: number;

    @Property()
    @ApiProperty()
    missed: number;

    @Property({ default: false })
    @ApiProperty()
    isMax = false;

    @ManyToOne(() => SeasonGameday)
    seasonGameday: SeasonGameday;

    @ManyToOne(() => Account)
    account: Account;
}
