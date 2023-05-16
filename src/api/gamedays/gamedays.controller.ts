import { Controller } from '@nestjs/common';
import { GamedaysService } from './gamedays.service';

@Controller('gamedays')
export class GamedaysController {
  constructor(private readonly gamedaysService: GamedaysService) {}
}
