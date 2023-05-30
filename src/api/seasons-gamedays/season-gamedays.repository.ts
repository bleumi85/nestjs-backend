import { EntityRepository } from '@mikro-orm/postgresql';
import { SeasonGameday } from './entities';

export class SeasonGamedayRepository extends EntityRepository<SeasonGameday> {}
