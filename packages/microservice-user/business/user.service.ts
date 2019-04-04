import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UserDto } from '../domain/user.dto';
import { CreateUserCommand } from './command/interface/createUser.command';

@Injectable()
export class UserService {
  constructor(private readonly commandBus: CommandBus) {}

  async createUser(userDto: UserDto) {
    return this.commandBus.execute(new CreateUserCommand(userDto));
  }
}
