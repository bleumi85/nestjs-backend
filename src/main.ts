import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from './common/constants';
import { setupSwagger } from './utils';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

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
                Logger.log(
                    `Application running on port ${PORT}`,
                    'Web-Production',
                );
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
