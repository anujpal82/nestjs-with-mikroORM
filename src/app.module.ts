import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from 'mikro-orm.config';
import { UserModule } from './modules/user.module';
import { MovieModule } from './modules/movie.module';
import { ShowModule } from './modules/show.module';
import { TicketModule } from './modules/ticketModule';
@Module({
  imports: [MikroOrmModule.forRoot(config), UserModule,MovieModule,ShowModule,TicketModule],
})
export class AppModule {}
