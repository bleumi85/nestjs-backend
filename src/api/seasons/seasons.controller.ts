import { Controller, Get, UseGuards } from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

const name = 'seasons';

@Controller(name)
@ApiTags(name)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Get()
  async findAll() {
    return await this.seasonsService.findAll();
  }
}
