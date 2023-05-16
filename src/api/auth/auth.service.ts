import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto';
import { AccountRepository } from '../accounts/accounts.repository';
import { AccountsHelper } from '../accounts/accounts.helper';
import { AuthHelper } from './auth.helper';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class AuthService {
    constructor(
        private readonly accountHelper: AccountsHelper,
        private readonly accountRepo: AccountRepository,
        private readonly authHelper: AuthHelper,
        private readonly em: EntityManager,
    ) {}

    public async login(body: LoginDto, ipAddress: string) {
        const { email, password } = body;
        const account = await this.accountRepo.findOne({ email });

        if (
            !account ||
            !account.isVerified ||
            !(await this.authHelper.isPasswordValid(password, account.passwordHash))
        ) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        // authentication successful so generate jwt and refresh tokens
        const jwtToken = await this.authHelper.generateJwtToken(account);
        const refreshToken = this.authHelper.generateRefreshToken(account, ipAddress);
        this.em.persistAndFlush(refreshToken);

        return {
            ...this.accountHelper.buildAccountRO(account),
            jwtToken,
            refreshToken: refreshToken.token,
        };
    }
}
