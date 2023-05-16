import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { Account } from './entities';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RoleGuard } from './role.guard';
import { Roles } from './roles.decorator';
import { Role } from './accounts.interface';

const name = 'accounts';

@Controller(name)
@ApiTags(name)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @Get()
    @Roles(Role.ADMIN)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'All accounts',
        type: Account,
        isArray: true,
    })
    async findAll() {
        return await this.accountsService.findAll();
    }
}
