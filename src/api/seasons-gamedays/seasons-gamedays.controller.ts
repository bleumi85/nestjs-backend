import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SeasonsGamedaysService } from './seasons-gamedays.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RoleGuard } from '../accounts/role.guard';
import { Roles } from '../accounts/roles.decorator';
import { Role } from '../accounts/accounts.interface';
import { CreateSeasonGamedayDto } from './dto';

const name = 'season-gamedays'

@Controller(name)
@ApiTags(name)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class SeasonsGamedaysController {
    constructor(private readonly sgService: SeasonsGamedaysService) {}

    @Get()
    @Roles(Role.ADMIN)
    @ApiResponse({ description: 'All SeasonGamedays'})
    async findAll() {
        return await this.sgService.findAll();
    }

    @Get('unsubmitted')
    @Roles(Role.ADMIN)
    @ApiResponse({ description: 'All SeasonGamedays without any bet'})
    async findAllUnsubmitted() {
        return await this.sgService.findAllUnsubmitted();
    }

    @Get(':id')
    @Roles(Role.ADMIN)
    async findOne(@Param('id') id:string) {
        return await this.sgService.findOne(id);
    }

    @Post()
    @Roles(Role.ADMIN)
    async create(@Body() createSeasonGamedayDto: CreateSeasonGamedayDto) {
        return await this.sgService.create(createSeasonGamedayDto);
    }
}
