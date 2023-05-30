import { Module } from '@nestjs/common';
import { SeasonsGamedaysService } from './seasons-gamedays.service';
import { SeasonsGamedaysController } from './seasons-gamedays.controller';
import { SeasonGameday } from './entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    controllers: [SeasonsGamedaysController],
    providers: [SeasonsGamedaysService],
    imports: [MikroOrmModule.forFeature([SeasonGameday])],
})
export class SeasonsGamedaysModule { }
