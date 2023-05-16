import { Entity, Property } from '@mikro-orm/core';
import { PrimaryEntity } from './primary.entity';

@Entity({ abstract: true })
export class DateEntity extends PrimaryEntity {
    @Property({ defaultRaw: 'current_timestamp'})
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date(), nullable: true })
    updatedAt: Date;
}
