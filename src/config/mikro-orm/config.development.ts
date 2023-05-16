import { defineConfig } from '@mikro-orm/postgresql';
import config from './config';

export default defineConfig({
    ...config,
    dbName: 'nestjs-backend-dev',
    user: 'myuser',
    password: 'mypassword',
    host: 'localhost',
    debug: true,
});
