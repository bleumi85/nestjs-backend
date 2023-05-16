import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './accounts.interface';
import { Account } from './entities';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    matchRoles(roles: Role[], accountRole: Role) {
        return roles.some((role) => role === accountRole);
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());

        if (!roles || roles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const account: Account = request.user;

        return this.matchRoles(roles, account.role);
    }
}
