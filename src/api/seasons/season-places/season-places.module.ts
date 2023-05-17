import { Module } from '@nestjs/common';
import { SeasonPlacesService } from './season-places.service';
import { SeasonPlacesController } from './season-places.controller';

@Module({
    controllers: [SeasonPlacesController],
    providers: [SeasonPlacesService],
})
export class SeasonPlacesModule {}
