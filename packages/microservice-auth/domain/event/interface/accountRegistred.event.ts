import { AuthHashedCredentialsDto } from '@shitake/microservice-auth/domain/dto';

export class AccountRegistredEvent {
  public constructor(public readonly uuid: string, public readonly data: AuthHashedCredentialsDto) {}
}
