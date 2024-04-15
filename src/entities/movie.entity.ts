import { PrimaryKey, Property } from '@mikro-orm/core';
import { MovieRepository } from 'src/repositories/movie.repository';
import { v4 as uuidv4 } from 'uuid';
const { Entity } = require('@mikro-orm/core');

@Entity({ repository: () => MovieRepository })
export class Movie {
  @PrimaryKey({
    type: 'uuid',
  })
  id: string = uuidv4();
  @Property()
  name!: string;
  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
  }
}
