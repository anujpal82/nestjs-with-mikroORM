import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InternalServerErrorException } from '@nestjs/common';
import { Movie } from 'src/entities/movie.entity';

export class MovieRepository extends EntityRepository<Movie> {
  constructor(private readonly entityManager: EntityManager) {
    super(entityManager, Movie);
  }
  async createMovie(data: Partial<Movie>): Promise<Movie> {
    try {
      const movie = this.entityManager.create(Movie, data);
      await this.entityManager.persistAndFlush(movie);
      return movie;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async getMovieByName(name: string): Promise<Movie> {
    try {
      return await this.entityManager.findOne(Movie, { name });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
