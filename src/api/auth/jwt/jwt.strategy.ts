import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Account } from 'src/api/accounts/entities';
import { AuthHelper } from '../auth.helper';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    @Inject(AuthHelper)
    private readonly helper: AuthHelper;

    constructor(@Inject(ConfigService) config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('jwt.secret'),
            ignoreExpiration: false,
        });
    }

    private validate(payload: string): Promise<Account | never> {
        return this.helper.validateAccount(payload);
    }
}
