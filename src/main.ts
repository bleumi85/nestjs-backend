import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from './common/constants';
import { setupSwagger } from './utils';
import * as cookieParser from 'cookie-parser';

var whiteList = [];

var regexList = [
    /localhost:\d+$/,
];

const corsLogger = new Logger('CORS');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        credentials: true,
        origin: (origin, callback) => {
            if (origin === undefined) {
                corsLogger.log('No Origin');
                callback(null, true);
            } else if (whiteList.indexOf(origin) !== -1) {
                corsLogger.log(`WhiteList: ${origin}`);
                callback(null, true);
            } else if (regexList.some((regex) => regex.test(origin))) {
                corsLogger.log(`RegexList: ${origin}`);
                callback(null, true);
            } else {
                corsLogger.warn('Not allowed');
                callback(new Error(`Origin ${origin} not allowed by CORS`));
            }
        },
    });

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const configService = app.get(ConfigService);
    const PORT = configService.get<number>('port');
    const CURRENT_NODE_ENV = configService.get<string>('node_env');

    if (CURRENT_NODE_ENV === NODE_ENV.DEVELOPMENT) {
        Logger.log('Setup', 'Swagger');
        setupSwagger(app);
    }

    await app.listen(PORT, () => {
        switch (CURRENT_NODE_ENV) {
            case NODE_ENV.PRODUCTION: {
                Logger.log(`Application running on port ${PORT}`, 'Web-Production');
                break;
            }
            case NODE_ENV.DEVELOPMENT: {
                Logger.log(`http://localhost:${PORT}`, 'Web-Development');
                break;
            }
            default: {
                Logger.error('Environment not found', 'Web-Unknown');
            }
        }
    });
}
bootstrap();
