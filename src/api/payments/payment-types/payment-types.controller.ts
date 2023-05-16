import { Controller } from '@nestjs/common';
import { PaymentTypesService } from './payment-types.service';

@Controller('payment-types')
export class PaymentTypesController {
  constructor(private readonly paymentTypesService: PaymentTypesService) {}
}
