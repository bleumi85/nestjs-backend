import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { PrimaryEntity } from '../../../common/entities';
import { ApiProperty } from '@nestjs/swagger';
import { SeasonGameday } from '../../seasons-gamedays/entities';
import { Account } from '../../accounts/entities';

@Entity({ tableName: 'bets' })
@Unique({ properties: ['seasonGameday', 'account'] })
export class Bet extends PrimaryEntity {
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
