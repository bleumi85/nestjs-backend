import { EntityRepository } from '@mikro-orm/postgresql';
import { Season } from './entities';

export class SeasonRepository extends EntityRepository<Season> {}
