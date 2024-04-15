import { Body, Controller, Post } from '@nestjs/common';
import { createShowDto } from 'src/dtos/show-dto';
import { ShowService } from 'src/services/show.service';

@Controller('/show')
export class ShowController {
  constructor(private readonly movieService: ShowService) {}

  @Post('/create')
  // @ApiOkResponse({ status: 201, type: Movie })
  async createMovie(@Body() data: createShowDto) {
    return await this.movieService.createShow(data);
  }
}
