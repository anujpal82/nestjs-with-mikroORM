import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  BadRequestException,
  Put,
  InternalServerErrorException,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @ApiOkResponse({ status: 200, type: User, isArray: true })
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':userId')
  @ApiOkResponse({ status: 200, type: User })
  async getUser(
    @Param('userId') userId: string,
  ): Promise<User | BadRequestException> {
    return await this.userService.getUser(userId);
  }

  @Post()
  @ApiOkResponse({ status: 201, type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }
  @Put(':id')
  async updateWhatever(
    @Param('id') id: string,
    @Body() updateData: CreateUserDto,
  ): Promise<String> {
    try {
      const data = await this.userService.updateWhatever(id, updateData);

      return 'User updated successfully.';
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(err.message);
      }
    }
  }
  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<String> {
    return await this.userService.deleteUser(userId);
  }
}
