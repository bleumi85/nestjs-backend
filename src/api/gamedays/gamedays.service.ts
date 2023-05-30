import { Injectable } from '@nestjs/common';
import { GamedayRepository } from './gamedays.repository';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class GamedaysService {
    constructor(
        private readonly gamedayRepo: GamedayRepository,
        private readonly em: EntityManager,
    ) { }

    async findAll() {
        return await this.gamedayRepo.findAll({
            orderBy: [{ 'orderNumber': 'ASC' }]
        });
    }
}
