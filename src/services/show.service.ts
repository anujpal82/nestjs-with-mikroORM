import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { createShowDto } from 'src/dtos/show-dto';
import { Show } from 'src/entities/show.entity';
import { ShowRepository } from 'src/repositories/show.repository';

@Injectable()
export class ShowService {
  constructor(@InjectRepository(Show) private readonly showRepository: ShowRepository) {}

  async createShow(data: createShowDto): Promise<Show> {
    if(!data.name){
        throw new  BadRequestException('Please provide valid show name');
    }
    const ifExist = await this.showRepository.getShowByName(data.name);
    if (ifExist) {
      throw new ConflictException('Show already exists');
    }
    return this.showRepository.createShow(data);
  }
}
