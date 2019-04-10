import { AuthClearTextCredentialsDto } from '@shitake/microservice-auth/domain/dto';

export class GetUserIdAfterValidationQuery {
  public constructor(public readonly authCredentialsDto: AuthClearTextCredentialsDto) {}
}
