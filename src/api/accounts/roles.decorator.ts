import { SetMetadata } from '@nestjs/common';
import { Role } from './accounts.interface';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
