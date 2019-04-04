import uuid from 'uuid';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from '../interface/createUser.command';
import { User } from '../../../domain/user.model';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly publisher: EventPublisher) {}

  async execute(command: CreateUserCommand) {
    const { userDto } = command;

    const user = this.publisher.mergeObjectContext(new User(uuid()));
    user.create(userDto);
    user.commit();
  }
}
