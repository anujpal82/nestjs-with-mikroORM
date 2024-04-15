import {
  CreateOptions,
  EntityRepository,
  FilterQuery,
  RequiredEntityData,
} from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User } from 'src/entities/user.entity';

export class UserRepository extends EntityRepository<User> {
  constructor(private readonly entityManager: EntityManager) {
    super(entityManager, User);
  }
  async createUser(data: CreateUserDto): Promise<User> {
    const email = data.email;
    const alreadyCreated = await this.findOne({ email });

    if (!alreadyCreated) {
      const user = new User(
        data.name,
        data.email,
        data.password,
        data.profileImage,
      );
      await this.entityManager.persistAndFlush(user);

      return user;
    } 
  }

  async getAllUser(): Promise<User[]> {
    return await this.findAll();
  }

  async getUser(userId: string): Promise<User | BadRequestException> {
    return await this.findOne({ id: userId });
  }
  async getUserByMail(email: String): Promise<User | BadRequestException> {
    return await this.findOne({ email } as FilterQuery<User>);
  }
  async updateWhatever(
    userId: string,
    updateData: CreateUserDto,
  ): Promise<User> {
    try {
      const user = await this.entityManager.findOne(User, { id: userId });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      for (const key in updateData) {
        if (updateData.hasOwnProperty(key)) {
          user[key] = updateData[key];
        }
      }
      await this.entityManager.flush();
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async deleteUser(userId: string): Promise<void> {
    try {
      const user = await this.getUser(userId);
      if (!user) {
        throw new NotFoundException(`User not found with ID : ${userId}`);
      }
      await this.entityManager.removeAndFlush(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
