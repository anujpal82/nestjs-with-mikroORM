import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InternalServerErrorException } from '@nestjs/common';
import { Show } from 'src/entities/show.entity';
import { Ticket } from 'src/entities/tickets.entity';
import { User } from 'src/entities/user.entity';

export class TicketRepository extends EntityRepository<Ticket> {
  constructor(private readonly entityManager: EntityManager) {
    super(entityManager, Ticket);
  }
  async createTicket(data: {
    showId: string;
    userId: string;
  }): Promise<Ticket> {
    try {
      const showDetails = await this.entityManager.findOne(Show, {
        id: data.showId,
      });
      const userDetails = await this.entityManager.findOne(User, {
        id: data.userId,
      });
      const ticket = new Ticket(showDetails, userDetails);
      Object.assign(ticket, data);
      await this.entityManager.persistAndFlush(ticket);
      return ticket;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
async getAllShowTickets(showId: string): Promise<Ticket[]> {
  try {
    const tickets = await this.entityManager.find(Ticket, {
      show: { id: showId },
    }, {
      populate: ['user', 'show'],
    });
    return tickets;
  } catch (err) {
    throw new InternalServerErrorException(err.message);
  }
}
}
