import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './entities';
import { AccountRepository } from './accounts.repository';

@Injectable()
export class AccountsHelper {
    constructor(private readonly accountRepo: AccountRepository) {}

    buildAccountRO(account: Account) {
        const accountRO = {
            id: account.id,
            firstName: account.firstName,
            lastName: account.lastName,
            userName: account.userName,
            email: account.email,
            role: account.role,
            isVerified: account.isVerified,
            expirationDate: account.expirationDate,
        };

        return {
            account: accountRO,
        };
    }

    async getAccount(id: string): Promise<Account | never> {
        const account = await this.accountRepo.findOne({ id });
        if (!account) throw new NotFoundException('Account not found');
        return account;
    }
}
