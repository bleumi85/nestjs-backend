import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RoleGuard } from '../accounts/role.guard';
import { Roles } from '../accounts/roles.decorator';
import { Role } from '../accounts/accounts.interface';

const name = 'bets';

@Controller(name)
@ApiTags(name)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class BetsController {
    constructor(private readonly betsService: BetsService) {}

    @Post('multiple')
    async createMultiple(@Body() createBetsDto: CreateBetDto[]) {
        return await this.betsService.createMultiple(createBetsDto);
    }

    @Post()
    async create(@Body() createBetDto: CreateBetDto) {
        return await this.betsService.create(createBetDto);
    }

    @Get()
    @Roles(Role.ADMIN)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'All bets',
    })
    async findAll() {
        return this.betsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.betsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBetDto: UpdateBetDto) {
        return this.betsService.update(+id, updateBetDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.betsService.remove(+id);
    }
}
