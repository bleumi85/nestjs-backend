import { Controller, ForbiddenException, Get, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { Account } from './entities';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RoleGuard } from './role.guard';
import { Roles } from './roles.decorator';
import { Role } from './accounts.interface';
import { AuthRequest } from '../auth/dto/auth.request.dto';

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

    @Get(':id')
    @Roles()
    async findOne(@Param('id') id: string, @Req() req: AuthRequest) {
        // users can get their own account and admins can get any account
        this.checkForAdmin(id, req);

        return await this.accountsService.findOne(id);
    }

    @Get(':id/payments')
    @Roles(Role.USER)
    async findOnePayments(@Param('id') id: string) {
        return await this.accountsService.findOnePayments(id);
    }

    @Get(':id/seasons')
    @Roles(Role.USER)
    async findOneSeasons(@Param('id') id: string) {
        return await this.accountsService.findOneSeasons(id);
    }

    // helpers

    checkForAdmin(id: string, req: AuthRequest) {
        if (id !== req.account.id && req.account.role !== Role.ADMIN) {
            throw new ForbiddenException('Not enough permissions');
        }
    }
}
