import { AuthClearTextCredentialsDto } from '@shitake/microservice-auth/domain/dto';

export class RegisterAccountCommand {
  constructor(public readonly authCredentialsDto: AuthClearTextCredentialsDto) {}
}
