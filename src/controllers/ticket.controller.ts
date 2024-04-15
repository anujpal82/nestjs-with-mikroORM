import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { TicketService } from 'src/services/ticket.services';

@Controller('/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('/create')
  async createTicket(@Body() data: { showId: string; userId: string }) {
    return this.ticketService.createTicket(data);
  }

  @Get('/show/:showId')
  async getAllShowTicket(@Param('showId') showId: string) {
    return this.ticketService.getAllShowTicket(showId);
  }
}
