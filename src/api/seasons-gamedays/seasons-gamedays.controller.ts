import { Controller } from '@nestjs/common';
import { SeasonsGamedaysService } from './seasons-gamedays.service';

@Controller('seasons-gamedays')
export class SeasonsGamedaysController {
    constructor(private readonly seasonsGamedaysService: SeasonsGamedaysService) {}
}
