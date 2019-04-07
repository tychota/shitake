import * as crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';

import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { LoginCommand } from '@shitake/microservice-auth/business/command';
import { Account } from '@shitake/microservice-auth/domain/model';
import { AccountEntity } from '@shitake/microservice-auth/infrastructure';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    @InjectEntityManager('accountConnection')
    private readonly entityManager: EntityManager,
  ) {}

  async execute(command: LoginCommand) {
    const { accountId } = command;

    const accountRepo = this.entityManager.getRepository(AccountEntity);
    const account = await accountRepo.findOneOrFail(accountId);

    // https://security.stackexchange.com/questions/41743/how-many-bytes-should-an-authorization-token-have
    const refreshToken = crypto.randomBytes(25).toString('base64');

    const user = this.publisher.mergeObjectContext(new Account(account.id));
    user.login(refreshToken);
    user.commit();

    const result = {
      refreshToken,
      // Todo change the secret
      authToken: jsonwebtoken.sign({ id: accountId }, 'SECRET', { notBefore: '-10s', expiresIn: '10min' }),
      id: accountId,
    };

    return result;
  }
}
