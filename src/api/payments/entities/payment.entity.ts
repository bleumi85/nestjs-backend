import { DecimalType, Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { PrimaryEntity } from '../../../common/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../../accounts/entities';
import { PaymentType } from '../payment-types/entities';
import { Season } from '../../seasons/entities';

@Entity({ tableName: 'payments'})
export class Payment extends PrimaryEntity {
    @Property({ type: 'date'})
    @ApiProperty()
    booked: Date;

    @Property({ type: 'decimal', precision: 10, scale: 2 })
    @ApiProperty()
    amount: DecimalType;

    @ManyToOne(() => Account)
    account: Account;

    @ManyToOne(() => PaymentType)
    paymentType: PaymentType;

    @ManyToOne(() => Season)
    season: Season;
}