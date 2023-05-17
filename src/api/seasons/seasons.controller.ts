import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CreateSeasonDto, UpdateSeasonDto } from './dto';

const name = 'seasons';

@Controller(name)
@ApiTags(name)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SeasonsController {
    constructor(private readonly seasonsService: SeasonsService) {}

    @Post()
    async create(@Body() createSeasonDto: CreateSeasonDto) {
        return await this.seasonsService.create(createSeasonDto);
    }

    @Get()
    async findAll() {
        return await this.seasonsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.seasonsService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateSeasonDto: UpdateSeasonDto) {
        return await this.seasonsService.update(id, updateSeasonDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.seasonsService.remove(id);
    }
}
