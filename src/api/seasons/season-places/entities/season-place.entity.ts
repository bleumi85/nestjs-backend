import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { PrimaryEntity } from '../../../../common/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Season } from '../../entities';

@Entity({ tableName: 'season_places'})
@Unique({
    properties: ['season', 'place'],
    name: 'place_per_season_unique'
})
export class SeasonPlace extends PrimaryEntity {
    @Property()
    @ApiProperty()
    place: number;

    @Property()
    @ApiProperty()
    percentage: number;

    @ManyToOne(() => Season)
    season: Season;
}
