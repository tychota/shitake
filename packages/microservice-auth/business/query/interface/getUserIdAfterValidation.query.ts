import { AuthClearTextCredentialsDto } from '@shitake/microservice-auth/domain/dto';

export class GetUserIdAfterValidationQuery {
  constructor(public readonly authCredentialsDto: AuthClearTextCredentialsDto) {}
}
