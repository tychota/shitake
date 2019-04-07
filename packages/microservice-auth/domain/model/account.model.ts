import { AggregateRoot } from '@nestjs/cqrs';

import { AuthClearTextCredentialsDto, AuthHashedCredentialsDto } from '@shitake/microservice-auth/domain/dto';
import { AccountRegistredEvent } from '@shitake/microservice-auth/domain/event';

export class Account extends AggregateRoot {
  constructor(private readonly uuid: string) {
    super();
  }

  register(authHashedCredentialDto: AuthHashedCredentialsDto) {
    this.apply(new AccountRegistredEvent(this.uuid, authHashedCredentialDto));
  }
}
