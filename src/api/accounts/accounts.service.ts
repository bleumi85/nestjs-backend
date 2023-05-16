import { Injectable } from '@nestjs/common';
import { AccountsHelper } from './accounts.helper';
import { AccountRepository } from './accounts.repository';

@Injectable()
export class AccountsService {
    constructor(
        private readonly accountsHelper: AccountsHelper,
        private readonly accountRepo: AccountRepository,
    ) {}

    async findAll() {
        const accounts = await this.accountRepo.findAll();
        return accounts.map((account) => this.accountsHelper.buildAccountRO(account).account);
    }
}
