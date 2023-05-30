import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { BetRepository } from './bets.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { Bet } from './entities';
import { SeasonGameday } from '../seasons-gamedays/entities';
import { Account } from '../accounts/entities';

@Injectable()
export class BetsService {
    constructor(
        private readonly betRepo: BetRepository,
        private readonly em: EntityManager,
    ) { }

    async create(createBetDto: CreateBetDto) {
        return 'This action adds a new bet';
    }

    async createMultiple(createBetsDto: CreateBetDto[]) {
        const { seasonGamedayId } = createBetsDto[0];

        const seasonGameday = await this.em.findOneOrFail(SeasonGameday, { id: seasonGamedayId });

        const createdBets = await this.em.transactional(async (em) => {
            const bets: Bet[] = [];

            for (const betDto of createBetsDto) {
                const { accountId } = betDto;

                const account = await this.em.findOneOrFail(Account, accountId);

                const bet = em.create(Bet, { ...betDto, account, seasonGameday });
                bets.push(bet);
            }

            await em.persistAndFlush(bets);

            return bets;
        });

        return createdBets;
    }

    async findAll() {
        const bets = await this.betRepo.findAll({
            populate: ['account','seasonGameday.gameday', 'seasonGameday.season', 'seasonGameday'],
            fields: [
                '*',
                'account.id', 'account.userName', 'account.firstName', 'account.lastName'
            ]
        });
        return bets;
    }

    findOne(id: number) {
        return `This action returns a #${id} bet`;
    }

    update(id: number, updateBetDto: UpdateBetDto) {
        return `This action updates a #${id} bet`;
    }

    remove(id: number) {
        return `This action removes a #${id} bet`;
    }
}
