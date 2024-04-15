import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { ShowController } from 'src/controllers/show.controller';
import { ShowService } from 'src/services/show.service';
import { ShowRepository } from 'src/repositories/show.repository';
import { Show } from 'src/entities/show.entity';

@Module({
  controllers: [ShowController],
  providers: [ShowService,ShowRepository],
  imports: [MikroOrmModule.forFeature({ entities: [Show] })],
  exports: [ShowService],
})
export class ShowModule {}
