import { Injectable } from '@nestjs/common';
import { AccountsHelper } from './accounts.helper';
import { AccountRepository } from './accounts.repository';

@Injectable()
export class AccountsService {
    constructor(
        private readonly accountsHelper: AccountsHelper,
        private readonly accountRepo: AccountRepository,
    ) { }

    async findAll() {
        const accounts = await this.accountRepo.findAll();
        return accounts.map((account) => this.accountsHelper.buildAccountRO(account).account);
    }

    async findOne(id: string) {
        const account = await this.accountsHelper.getAccount(id);
        return this.accountsHelper.buildAccountRO(account);
    }

    async findOnePayments(id: string) {
        const account = await this.accountRepo.findOne({ id }, {
            populate: ['payments.season', 'payments.paymentType'],
            fields: ['id']
        })
        return account;
    }

    async findOneSeasons(id: string) {
        const account = await this.accountRepo.findOne({ id }, {
            populate: ['seasons'],
            fields: ['id']
        });
        const accountRO = this.accountsHelper.buildAccountRO(account);
        return { ...accountRO, seasons: account.seasons }
    }
}
