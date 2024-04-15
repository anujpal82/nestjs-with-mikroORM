import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Ticket } from 'src/entities/tickets.entity';
import { User } from 'src/entities/user.entity';
import { TicketRepository } from 'src/repositories/ticket.repository';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: TicketRepository,
  ) {}

  async createTicket(data: { showId: string; userId: string }): Promise<Ticket> {
    try {
      if (!data.showId || !data.userId) {
        throw new BadRequestException('Please provide valid showId and user');
      }
      const createdTicket = await this.ticketRepository.createTicket(data);
      return createdTicket;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
  async getAllShowTicket(showId: string): Promise<Ticket[]> {
    try {
      const tickets = await this.ticketRepository.getAllShowTickets(showId);
      return tickets;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
