import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import { PrimaryEntity } from '../../../../common/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Payment } from '../../entities';

@Entity({ tableName: 'payment_types' })
export class PaymentType extends PrimaryEntity {
    @Property()
    @Unique()
    @ApiProperty()
    title: string;

    @Property({ nullable: true })
    @ApiProperty()
    textPositive: string;

    @Property({ nullable: true })
    @ApiProperty()
    textNegative: string;

    @OneToMany(() => Payment, (p) => p.paymentType)
    payments = new Collection<Payment>(this);
}
