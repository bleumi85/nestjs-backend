import { Module } from '@nestjs/common';
import { BetsService } from './bets.service';
import { BetsController } from './bets.controller';
import { Bet } from './entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    controllers: [BetsController],
    providers: [BetsService],
    imports: [MikroOrmModule.forFeature([Bet])]
})
export class BetsModule { }
