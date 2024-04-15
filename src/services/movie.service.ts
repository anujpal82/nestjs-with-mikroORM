import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMovieDto } from 'src/dtos/create-movie.dto';
import { Movie } from 'src/entities/movie.entity';
import { MovieRepository } from 'src/repositories/movie.repository';
import { ResponseReturnType } from 'types';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: MovieRepository,
  ) {}

  async createMovie(data: CreateMovieDto): Promise<Movie> {
    {
      try {
        if (!data.name) {
          throw new BadRequestException('Please provide valid movie name');
        }
        const ifExist = await this.movieRepository.getMovieByName(data?.name);

        if (ifExist) {
          throw new ConflictException('Movie already exists');
        }

        return this.movieRepository.createMovie(data);
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
