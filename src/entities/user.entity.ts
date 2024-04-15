/* eslint-disable @typescript-eslint/naming-convention */
import { Property, Entity, Unique, PrimaryKey } from '@mikro-orm/core';
import { IsEmail } from 'class-validator';
import { UserRepository } from 'src/repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';

@Entity({ repository: () => UserRepository })
export class User {
  @PrimaryKey({
    type: 'uuid',
  })
  id: string;
  @Property()
  name: string;

  @Property()
  @Unique()
  @IsEmail()
  email: string;

  @Property()
  password: string;

  @Property({ nullable: true })
  profile_image?: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(
    name: string,
    email: string,
    password: string,
    profile_image: string,
  ) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.password = password;
    this.profile_image = profile_image;
  }
}
