import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { createShowDto } from 'src/dtos/show-dto';
import { Movie } from 'src/entities/movie.entity';
import { Show } from 'src/entities/show.entity';

export class ShowRepository extends EntityRepository<Show> {
  constructor(private readonly entityManager: EntityManager) {
    super(entityManager, Movie);
  }
  async createShow(data: createShowDto): Promise<Show> {
    try {
      const movieDetails = await this.entityManager.findOne(Movie, {
        id: data.movieId,
      });
      if (!movieDetails) {
        throw new NotFoundException('Movie not found');
      }

      if (!data.name || !data.movieId || !data.price) {
        throw new NotFoundException('Please provide valid information');
      }
      const showInfo=new Show(data.name,movieDetails,data.price)
      const show = this.entityManager.create(Show, showInfo);
      await this.entityManager.persistAndFlush(show);
      return showInfo;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async getShowByName(name: string): Promise<Show> {
    try {
      return await this.entityManager.findOne(Show, { name });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
