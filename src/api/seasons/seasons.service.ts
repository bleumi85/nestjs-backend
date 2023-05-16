import { Injectable } from '@nestjs/common';
import { SeasonRepository } from './seasons.repository';

@Injectable()
export class SeasonsService {
    constructor(
        private readonly seasonRepo: SeasonRepository,
    ) {}

    async findAll() {
        return await this.seasonRepo.findAll();
    }
}
