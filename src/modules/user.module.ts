import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { User } from 'src/entities/user.entity';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService,UserRepository],
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  exports: [UserService],
})
export class UserModule {}
