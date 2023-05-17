import { Injectable } from '@nestjs/common';
import { SeasonRepository } from './seasons.repository';
import { CreateSeasonDto, UpdateSeasonDto } from './dto';

@Injectable()
export class SeasonsService {
    constructor(
        private readonly seasonRepo: SeasonRepository,
    ) {}

    async create(createSeasonDto: CreateSeasonDto) {
        return 'This action adds a new season';
    }

    async findAll() {
        return await this.seasonRepo.findAll();
    }

    async findOne(id: string) {
        return `This action returns a #${id} season`;
    }

    async update(id: string, updateSeasonDto: UpdateSeasonDto) {
        return `This action updates a #${id} season`;
    }

    remove(id: string) {
        return `This action removes a #${id} season`;
      }
}
