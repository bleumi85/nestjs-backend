import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { PrimaryEntity } from '../../../common/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Season } from '../../seasons/entities';
import { Gameday } from '../../gamedays/entities';

@Entity({ tableName: 'seasons_gamedays'})
@Unique({ properties: ['season', 'gameday'], name: 'seasons_gamedays_always_unique'})
export class SeasonGameday extends PrimaryEntity {
    @ManyToOne(() => Season)
    season: Season;

    @ManyToOne(() => Gameday)
    gameday: Gameday;

    @Property({ type: 'date'})
    @ApiProperty()
    dateStart: Date;

    @Property({type: 'date'})
    @ApiProperty()
    dateEnd: Date;
}