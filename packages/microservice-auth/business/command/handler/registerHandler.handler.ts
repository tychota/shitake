import uuid from 'uuid';
import argon2 from 'argon2';

import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { RegisterAccountCommand } from '@shitake/microservice-auth/business/command';
import { Account } from '@shitake/microservice-auth/domain/model';

@CommandHandler(RegisterAccountCommand)
export class RegisterAccountHandler implements ICommandHandler<RegisterAccountCommand> {
  constructor(private readonly publisher: EventPublisher) {}

  async execute(command: RegisterAccountCommand) {
    const {
      authCredentialsDto: { email, password },
    } = command;

    const hashedPassword = await argon2.hash(password);
    const accountId = uuid.v4();

    const user = this.publisher.mergeObjectContext(new Account(accountId));
    user.register({ email, hashedPassword });
    user.commit();

    return accountId;
  }
}
