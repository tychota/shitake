import { AuthHashedCredentialsDto } from '@shitake/microservice-auth/domain/dto';

export class LoggedInEvent {
  public constructor(public readonly uuid: string, public readonly refreshToken: string) {}
}
