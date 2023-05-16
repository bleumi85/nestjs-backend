import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AuthModule } from '../auth/auth.module';
import { Account } from './entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AccountsHelper } from './accounts.helper';

@Module({
    providers: [AccountsHelper, AccountsService],
    controllers: [AccountsController],
    imports: [AuthModule, MikroOrmModule.forFeature([Account])],
})
export class AccountsModule {}
