import { EntityRepository } from '@mikro-orm/postgresql';
import { Gameday } from './entities';

export class GamedayRepository extends EntityRepository<Gameday> {}
