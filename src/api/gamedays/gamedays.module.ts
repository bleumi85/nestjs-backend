import { Module } from '@nestjs/common';
import { GamedaysService } from './gamedays.service';
import { GamedaysController } from './gamedays.controller';
import { Gameday } from './entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    controllers: [GamedaysController],
    providers: [GamedaysService],
    imports: [MikroOrmModule.forFeature([Gameday])]
})
export class GamedaysModule {}
