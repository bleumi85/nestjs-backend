import { Collection, Entity, ManyToOne, OneToMany, Property, Unique } from '@mikro-orm/core';
import { PrimaryEntity } from '../../../common/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Season } from '../../seasons/entities';
import { Gameday } from '../../gamedays/entities';
import { Bet } from '../../bets/entities';

@Entity({ tableName: 'seasons_gamedays' })
@Unique({ properties: ['season', 'gameday'], name: 'seasons_gamedays_always_unique' })
export class SeasonGameday extends PrimaryEntity {
    @ManyToOne(() => Season)
    season: Season;

    @ManyToOne(() => Gameday)
    gameday: Gameday;

    @Property({ type: 'date', nullable: true })
    @ApiProperty()
    dateStart: Date;

    @Property({ type: 'date', nullable: true })
    @ApiProperty()
    dateEnd: Date;

    @OneToMany(() => Bet, b => b.seasonGameday)
    bets = new Collection<Bet>(this);
}