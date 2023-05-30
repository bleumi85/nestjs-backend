import { Controller, Get, UseGuards } from '@nestjs/common';
import { GamedaysService } from './gamedays.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RoleGuard } from '../accounts/role.guard';
import { Roles } from '../accounts/roles.decorator';
import { Role } from '../accounts/accounts.interface';

const name = 'gamedays';

@Controller(name)
@ApiTags(name)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class GamedaysController {
    constructor(
        private readonly gamedaysService: GamedaysService
    ) { }

    @Get()
    @Roles(Role.ADMIN)
    async findAll() {
        return await this.gamedaysService.findAll();
    }
}
