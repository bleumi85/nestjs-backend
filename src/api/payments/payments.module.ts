import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentTypesModule } from './payment-types/payment-types.module';

@Module({
    controllers: [PaymentsController],
    providers: [PaymentsService],
    imports: [PaymentTypesModule],
})
export class PaymentsModule {}
