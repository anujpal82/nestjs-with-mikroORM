import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateMovieDto } from 'src/dtos/create-movie.dto';
import { Movie } from 'src/entities/movie.entity';
import { MovieService } from 'src/services/movie.service';

@Controller('/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('/create')
  @ApiOkResponse({ status: 201, type: Movie })
  async createMovie(@Body() data: CreateMovieDto) {
    return await this.movieService.createMovie(data);
   
  }
}
