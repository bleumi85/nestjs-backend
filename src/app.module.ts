import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AccountSeeder } from './seeders/AccountSeeder';

@Module({
    imports: [ConfigModule, MikroOrmModule.forRoot()],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements OnModuleInit, OnModuleDestroy {
    constructor(private readonly orm: MikroORM) {}

    async onModuleInit() {
        await this.orm.getMigrator().up();
        await this.orm.getSeeder().seed(AccountSeeder);
    }

    async onModuleDestroy() {
        await this.orm.close();
    }
}
