import { AggregateRoot } from '@nestjs/cqrs';

import { AuthHashedCredentialsDto } from '@shitake/microservice-auth/domain/dto';
import { AccountRegistredEvent, LoggedInEvent } from '@shitake/microservice-auth/domain/event';

export class Account extends AggregateRoot {
  constructor(private readonly uuid: string) {
    super();
  }

  register(authHashedCredentialDto: AuthHashedCredentialsDto) {
    this.apply(new AccountRegistredEvent(this.uuid, authHashedCredentialDto));
  }

  login(refreshToken: string) {
    this.apply(new LoggedInEvent(this.uuid, refreshToken));
  }
}
