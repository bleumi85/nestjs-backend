import { Module } from '@nestjs/common';
import { SeasonsGamedaysService } from './seasons-gamedays.service';
import { SeasonsGamedaysController } from './seasons-gamedays.controller';

@Module({
    controllers: [SeasonsGamedaysController],
    providers: [SeasonsGamedaysService],
})
export class SeasonsGamedaysModule {}
