import { Module } from '@nestjs/common';
import { GamedaysService } from './gamedays.service';
import { GamedaysController } from './gamedays.controller';

@Module({
  controllers: [GamedaysController],
  providers: [GamedaysService]
})
export class GamedaysModule {}
