import { Module } from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { SeasonsController } from './seasons.controller';
import { Season } from './entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SeasonPlacesModule } from './season-places/season-places.module';

@Module({
  controllers: [SeasonsController],
  providers: [SeasonsService],
  imports: [MikroOrmModule.forFeature([Season]), SeasonPlacesModule],
})
export class SeasonsModule { }
