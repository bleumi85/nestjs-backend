import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Account } from '../accounts/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RefreshToken } from '../refresh-tokens/entities';
import { AccountsHelper } from '../accounts/accounts.helper';
import { AuthHelper } from './auth.helper';
import { JwtModule } from './jwt/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
        JwtModule,
        MikroOrmModule.forFeature([Account, RefreshToken]),
    ],
    controllers: [AuthController],
    providers: [AuthService, AccountsHelper, AuthHelper, JwtStrategy],
})
export class AuthModule {}
