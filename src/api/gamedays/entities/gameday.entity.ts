import { Collection, Entity, EntityRepositoryType, OneToMany, Property, Unique } from '@mikro-orm/core';
import { PrimaryEntity } from '../../../common/entities';
import { ApiProperty } from '@nestjs/swagger';
import { SeasonGameday } from '../../seasons-gamedays/entities';
import { GamedayRepository } from '../gamedays.repository';

@Entity({ tableName: 'gamedays', customRepository: () => GamedayRepository })
export class Gameday extends PrimaryEntity {
    [EntityRepositoryType]?: GamedayRepository;

    @Property()
    @Unique()
    @ApiProperty()
    title: string;

    @Property()
    @Unique()
    @ApiProperty()
    orderNumber: number;

    @Property({ persist: false })
    @ApiProperty({ type: Boolean })
    get isGameday() {
        return this.title.endsWith('Spieltag')
    }

    @OneToMany(() => SeasonGameday, (sg) => sg.gameday)
    season_gamedays = new Collection<SeasonGameday>(this);
}
