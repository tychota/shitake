import { AuthClearTextCredentialsDto } from '@shitake/microservice-auth/domain/dto';

export class RegisterAccountCommand {
  public constructor(public readonly authCredentialsDto: AuthClearTextCredentialsDto) {}
}
