import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Show } from './show.entity';
import { User } from './user.entity';
import { TicketRepository } from 'src/repositories/ticket.repository';
@Entity({ repository: () => TicketRepository })
export class Ticket {
  @PrimaryKey({
    type: 'uuid',
  })
  id: string = uuidv4();

  @Property()
  createdAt = new Date();

  @ManyToOne(() => Show)
  show: Show;

  @ManyToOne()
  user: User;
  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(show: Show, user: User) {
    this.id = uuidv4();
    this.show = show;
    this.user = user;
  }
}
