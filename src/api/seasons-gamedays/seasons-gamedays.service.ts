import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SeasonGamedayRepository } from './season-gamedays.repository';
import { CreateSeasonGamedayDto } from './dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Gameday } from '../gamedays/entities';
import { Season } from '../seasons/entities';
import { SeasonGameday } from './entities';

@Injectable()
export class SeasonsGamedaysService {
    constructor(
        private readonly sgRepo: SeasonGamedayRepository,
        private readonly em: EntityManager,
    ) { }

    async create(body: CreateSeasonGamedayDto) {
        const { gamedayId, seasonId, dateStart, dateEnd } = body;

        const gameday = await this.em.findOne(Gameday, { id: gamedayId });
        if (!gameday) throw new NotFoundException('Gameday not found');

        const season = await this.em.findOne(Season, { id: seasonId });
        if (!season) throw new NotFoundException('Season not found');

        const seasonGameday = new SeasonGameday();
        seasonGameday.gameday = gameday;
        seasonGameday.season = season;
        seasonGameday.dateStart = dateStart;
        seasonGameday.dateEnd = dateEnd;

        if (gameday.title.endsWith('Spieltag')) {
            if (!dateStart) {
                throw new BadRequestException('dateStart should not be null or undefined')
            }
            if (!dateEnd) {
                throw new BadRequestException('dateEnd should not be null or undefined')
            }
        }

        try {
            await this.em.persistAndFlush(seasonGameday);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Duplicate entry')
            } else {
                throw error;
            }
        }

        return seasonGameday;
    }

    async findAll() {
        const sgs = await this.sgRepo.findAll({
            populate: ['season', 'gameday']
        });
        return sgs;
    }

    async findAllUnsubmitted() {
        const qb = this.sgRepo.createQueryBuilder('sg');

        // Query 1
        const subQuery = this.sgRepo.createQueryBuilder('sgSub')
            .select(['id'])
            .leftJoin('bets', 'b')
            .groupBy('sgSub.id')
            .having('count(b.id) = 0');

        // Query 2
        const result = await qb
            .joinAndSelect('season', 's')
            .joinAndSelect('gameday', 'g')
            .joinAndSelect('s.accounts', 'a')
            .where({ id: { $in: subQuery.getKnexQuery() } })
            .select(['sg.*', 's.id as s__id', 's.description as s__description', 'g.id as g__id', 'g.title as g__title',
                'a.id as a__id', 'a.first_name as a__first_name', 'a.last_name as a__last_name', 'a.user_name as a__user_name'])
            .getResultList();

        return result;
    }

    async findOne(id: string) {
        return await this.sgRepo.findOne({ id }, {
            populate: ['gameday', 'season']
        })
    }
}
