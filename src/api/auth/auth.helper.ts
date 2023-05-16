import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Account } from '../accounts/entities';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '../refresh-tokens/entities';
import { AccountRepository } from '../accounts/accounts.repository';

@Injectable()
export class AuthHelper {
    constructor(
        private readonly accountRepo: AccountRepository,
        private readonly jwt: JwtService,
    ) {}

    // Generate JWT Token
    public async generateJwtToken(account: Account): Promise<string> {
        return this.jwt.signAsync({
            id: account.id,
            email: account.email,
            userName: account.userName,
        });
    }

    // Generate RefreshToken
    public generateRefreshToken(account: Account, ipAddress: string): RefreshToken {
        return new RefreshToken(account, this.randomTokenString(), ipAddress);
    }

    // Validate password
    public async isPasswordValid(password: string, comparePassword: string): Promise<boolean> {
        return bcrypt.compare(password, comparePassword);
    }

    // Generate random token string
    public randomTokenString(): string {
        return crypto.randomBytes(40).toString('hex');
    }

    // Get Account by Id we get from decode
    public async validateAccount(decoded: any): Promise<Account> {
        return await this.accountRepo.findOne(decoded.id);
    }
}
