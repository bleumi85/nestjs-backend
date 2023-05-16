import { Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import { PrimaryEntity } from '../../../common/entities';
import { ApiProperty } from '@nestjs/swagger';

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
}
