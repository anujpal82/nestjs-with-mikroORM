import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { TicketController } from 'src/controllers/ticket.controller';
import { TicketRepository } from 'src/repositories/ticket.repository';
import { Ticket } from 'src/entities/tickets.entity';
import { TicketService } from 'src/services/ticket.services';

@Module({
  controllers: [TicketController],
  providers: [TicketRepository, TicketService],
  imports: [MikroOrmModule.forFeature({ entities: [Ticket] })],
  exports: [TicketService],
})
export class TicketModule {}




