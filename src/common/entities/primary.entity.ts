import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

@Entity({ abstract: true })
export class PrimaryEntity {
    @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()'})
    @ApiProperty()
    id: string = v4()
}

