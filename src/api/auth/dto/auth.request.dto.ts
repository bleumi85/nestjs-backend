import { Request } from 'express';
import { Account } from 'src/api/accounts/entities';

export interface AuthRequest extends Request {
    account: Account;
}
