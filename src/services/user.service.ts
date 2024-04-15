import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository'; // Import UserRepository
import { CreateUserDto } from 'src/dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const alreadyCreated = await this.userRepository.getUserByMail(createUserDto.email);
    if (!alreadyCreated) {
      const { email, name, password } = createUserDto
      if (!email || !name || !password) {
        throw new HttpException('Please provide all information', HttpStatus.BAD_REQUEST)
      }
      return this.userRepository.createUser(createUserDto)
    }
    else {
      throw new HttpException('User already Exists', HttpStatus.CONFLICT)
    }
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUser(userId: string): Promise<User | BadRequestException> {
    if (!userId) {
      throw new BadRequestException('Please provide valid userId')
    }
    return await this.userRepository.getUser(userId);
  }
  async updateWhatever(userId: string, updateData: CreateUserDto): Promise<User | BadRequestException> {
    try {
      if (!userId) {
        throw new BadRequestException('Please provide valid userId')
      }
      const updatedWhatever = await this.userRepository.updateWhatever(userId, updateData);
      return updatedWhatever;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
  async deleteUser(userId: string): Promise<String> {

    try {
      if (!userId) {
        throw new BadRequestException(`Please provide valid userId.`);
      }

      await this.userRepository.deleteUser(userId);
      return 'User deleted successfully'
    }
    catch (error) {

      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException()
      }
    }


  }

}
