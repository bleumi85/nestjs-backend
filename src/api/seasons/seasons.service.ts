import { Injectable, NotFoundException } from '@nestjs/common';
import { SeasonRepository } from './seasons.repository';
import { CreateSeasonDto, UpdateSeasonDto } from './dto';
import { isUuidV4, isYear } from 'src/common/functions';
import { EntityManager, QueryBuilder } from '@mikro-orm/postgresql';
import { Account } from '../accounts/entities';
import { Bet } from '../bets/entities';
import { Season } from './entities';
import { PopulateOptions } from '@mikro-orm/core';

@Injectable()
export class SeasonsService {
    constructor(
        private readonly seasonRepo: SeasonRepository,
        private readonly em: EntityManager,
    ) { }

    async create(createSeasonDto: CreateSeasonDto) {
        return 'This action adds a new season';
    }

    async findAll() {
        return await this.seasonRepo.findAll({
            orderBy: [{ 'year': 'DESC' }]
        });
    }

    async findOne(yearOrId: string) {
        const query = this.findOneHelper(yearOrId);
        return this.findOneResultHelper(query);
    }

    async findOneWithAccounts(yearOrId: string) {
        const seasonQuery = this.findOneHelper(yearOrId);
        const knexSeasonQuery = seasonQuery.getKnexQuery();
        const seasonResult = await knexSeasonQuery.first();

        if (!seasonResult) {
            throw new NotFoundException('Season not found');
        }

        const seasonId = seasonResult.id;

        const query = this.em.createQueryBuilder(Account, 'a')
        query
            .select([
                'id', 'firstName', 'lastName', 'userName',
                "CAST((SELECT SUM(b_1.points) FROM bets b_1 JOIN seasons_gamedays sg_1 ON b_1.season_gameday_id = sg_1.id AND sg_1.season_id = s.id WHERE b_1.account_id = a.id) AS INTEGER) AS points_total",
                "CAST((SELECT SUM(b_1.points) FROM bets b_1 JOIN seasons_gamedays sg_1 ON b_1.season_gameday_id = sg_1.id AND sg_1.season_id = s.id JOIN gamedays g_1 ON g_1.id = sg_1.gameday_id AND g_1.title LIKE '%Spieltag' WHERE b_1.account_id = a.id) AS INTEGER) AS points_gameday",
                "CAST((SELECT SUM(b_1.points) FROM bets b_1 JOIN seasons_gamedays sg_1 ON b_1.season_gameday_id = sg_1.id AND sg_1.season_id = s.id JOIN gamedays g_1 ON g_1.id = sg_1.gameday_id AND g_1.title NOT LIKE '%Spieltag' WHERE b_1.account_id = a.id) AS INTEGER) AS points_bonus",
                "CAST((SELECT SUM(b_1.missed) FROM bets b_1 JOIN seasons_gamedays sg_1 ON b_1.season_gameday_id = sg_1.id AND sg_1.season_id = s.id WHERE b_1.account_id = a.id) AS INTEGER) AS missed_total",
                "CAST((SELECT 10 * SUM(b_1.points) - 10 * SUM(b_1.missed) -270 * COUNT(b_1.id) FROM bets b_1 JOIN seasons_gamedays sg_1 ON b_1.season_gameday_id = sg_1.id AND sg_1.season_id = s.id JOIN gamedays g_1 ON g_1.id = sg_1.gameday_id AND g_1.title LIKE '%Spieltag' WHERE b_1.account_id = a.id) AS INTEGER) AS money_total",
                "CAST((SELECT COALESCE(SUM(b_1.points), 0) from bets b_1 JOIN seasons_gamedays sg_1 on b_1.season_gameday_id = sg_1.id AND sg_1.season_id = s.id JOIN gamedays g_1 ON g_1.id = sg_1.gameday_id AND g_1.order_number <= g.order_number WHERE b_1.account_id = a.id) AS INTEGER) AS b__points_until_gameday",
            ])
            .join('seasons', 's')
            .joinAndSelect('bets', 'b')
            .joinAndSelect('b.seasonGameday', 'sg', { 'sg.season': seasonId })
            .joinAndSelect('sg.gameday', 'g')
            .where({ 's.id': seasonId })

        const knexQuery = query.getKnexQuery();
        const res = await this.em.getConnection().execute(knexQuery);

        const groupedAccounts: { [id: string]: any } = {};

        // Group 
        res.forEach((result: any) => {
            const accountId = result.id;

            // If the account doesn't exist
            if (!groupedAccounts[accountId]) {
                groupedAccounts[accountId] = {
                    id: accountId,
                    firstName: result.first_name,
                    lastName: result.last_name,
                    userName: result.user_name,
                    pointsTotal: result.points_total,
                    gamedaysTotal: result.points_gameday,
                    bonusTotal: result.points_bonus,
                    missedTotal: result.missed_total,
                    moneyTotal: result.money_total,
                    bets: []
                }
            }

            groupedAccounts[accountId].bets.push({
                id: result.b__id,
                points: result.b__points,
                missed: result.b__missed,
                isMax: result.b__is_max,
                pointsUntilGameday: result.b__points_until_gameday,
                gameday: {
                    id: result.g__id,
                    title: result.g__title,
                    orderNumber: result.g__order_number,
                    isGameday: result.g__title.endsWith('Spieltag')
                }
            })
        })

        const result = {
            id: seasonResult.id,
            year: seasonResult.year,
            description: seasonResult.description,
            isActive: seasonResult.is_active,
            seasonAccounts: Object.values(groupedAccounts)
        }

        return result;
    }

    async findOneWithGamedays(yearOrId: string) {
        let season = undefined;

        if (isYear(yearOrId)) {
            season = await this.seasonRepo.findOne({ year: +yearOrId, seasonGamedays: { gameday: { title: { $like: '%Spieltag' } } } }, {
                populate: ['seasonGamedays.gameday'],
                orderBy: { seasonGamedays: { gameday: { orderNumber: 'ASC' } } }
            });
        } else if (isUuidV4(yearOrId)) {
            season = await this.seasonRepo.findOne({ id: yearOrId, seasonGamedays: { gameday: { title: { $like: '%Spieltag' } } } }, {
                populate: ['seasonGamedays.gameday'],
                orderBy: { seasonGamedays: { gameday: { orderNumber: 'ASC' } } }
            });
        }

        if (!season) {
            throw new NotFoundException('Season not found')
        }
        return season;
    }

    async findOneWithPlaces(yearOrId: string) {
        let season = undefined;

        if (isYear(yearOrId)) {
            season = await this.seasonRepo.findOne({ year: +yearOrId }, {
                populate: ['seasonPlaces'],
                orderBy: { seasonPlaces: { place: 'ASC' } }
            })
        } else if (isUuidV4(yearOrId)) {
            season = await this.seasonRepo.findOne({ id: yearOrId })
        }

        if (!season) {
            throw new NotFoundException('Season not found')
        }
        return season;
    }

    async update(id: string, updateSeasonDto: UpdateSeasonDto) {
        return `This action updates a #${id} season`;
    }

    remove(id: string) {
        return `This action removes a #${id} season`;
    }

    // helper functions

    findOneHelper(yearOrId: string): QueryBuilder<Season> {
        const query = this.seasonRepo.createQueryBuilder('s');

        if (isYear(yearOrId)) {
            query.where({ year: +yearOrId })
        } else if (isUuidV4(yearOrId)) {
            query.where({ id: yearOrId })
        }

        return query;
    }

    async findOneResultHelper(query: QueryBuilder<Season>) {
        const season = await query.getSingleResult();

        if (!season)
            throw new NotFoundException('Season not found');

        return season;
    }
}
