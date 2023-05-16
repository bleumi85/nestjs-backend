import { Controller } from '@nestjs/common';
import { SeasonPlacesService } from './season-places.service';

@Controller('season-places')
export class SeasonPlacesController {
  constructor(private readonly seasonPlacesService: SeasonPlacesService) {}
}
