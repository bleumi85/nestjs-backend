import { EntityRepository } from '@mikro-orm/postgresql';
import { Bet } from './entities';

export class BetRepository extends EntityRepository<Bet> {}
