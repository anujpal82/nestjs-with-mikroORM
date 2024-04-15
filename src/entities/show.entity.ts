import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { ManyToOne } from '@mikro-orm/core';
import { Movie } from './movie.entity';
import { ShowRepository } from 'src/repositories/show.repository';
import { v4 as uuidv4 } from 'uuid';

@Entity({ repository: () => ShowRepository })
export class Show {
  @PrimaryKey({
    type: 'uuid',
  })
  id: string = uuidv4();

  @Property()
  name: string;

  @Property() 
  price: number
  

  @Property()
  createdAt = new Date();

  @Property()
  updatedAt = new Date();

  @ManyToOne(() => Movie)
  movie: Movie;
  constructor(name: string, movie: Movie,price:number) {
    this.id = uuidv4();
    this.name = name;
    this.movie = movie;
    this.price=price
  }
}
