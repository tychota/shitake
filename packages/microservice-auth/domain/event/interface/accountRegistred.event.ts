import { AuthHashedCredentialsDto } from '@shitake/microservice-auth/domain/dto';

export class AccountRegistredEvent {
  constructor(public readonly uuid: string, public readonly data: AuthHashedCredentialsDto) {}
}
