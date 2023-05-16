import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import { PrimaryEntity } from '../../../common/entities';
import { ApiProperty } from '@nestjs/swagger';
import { SeasonGameday } from '../../seasons-gamedays/entities';

@Entity({ tableName: 'gamedays' })
export class Gameday extends PrimaryEntity {
    @Property()
    @Unique()
    @ApiProperty()
    title: string;

    @Property()
    @Unique()
    @ApiProperty()
    orderNumber: number;

    @OneToMany(() => SeasonGameday, sg => sg.gameday)
    season_gamedays = new Collection<SeasonGameday>(this);
}
