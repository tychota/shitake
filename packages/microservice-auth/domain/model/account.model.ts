import { AggregateRoot } from '@nestjs/cqrs';

import { AuthHashedCredentialsDto } from '@shitake/microservice-auth/domain/dto';
import { AccountRegistredEvent, LoggedInEvent } from '@shitake/microservice-auth/domain/event';

export class Account extends AggregateRoot {
  public constructor(private readonly uuid: string) {
    super();
  }

  public register(authHashedCredentialDto: AuthHashedCredentialsDto) {
    this.apply(new AccountRegistredEvent(this.uuid, authHashedCredentialDto));
  }

  public login(refreshToken: string) {
    this.apply(new LoggedInEvent(this.uuid, refreshToken));
  }
}
