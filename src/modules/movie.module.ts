import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { MovieController } from "src/controllers/movie.controller";
import { Movie } from "src/entities/movie.entity";
import { MovieRepository } from "src/repositories/movie.repository";
import { MovieService } from "src/services/movie.service";


@Module({
  controllers: [MovieController],
  providers: [MovieRepository,MovieService],
  imports: [MikroOrmModule.forFeature({ entities: [Movie] })],
  exports: [MovieService],
})
export class MovieModule {}
