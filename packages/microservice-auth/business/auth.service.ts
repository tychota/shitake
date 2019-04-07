import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AuthClearTextCredentialsDto } from '@shitake/microservice-auth/domain/dto';
import { RegisterAccountCommand } from '@shitake/microservice-auth/business/command';

@Injectable()
export class AuthService {
  constructor(private readonly commandBus: CommandBus) {}

  async register(authCredentialsDto: AuthClearTextCredentialsDto) {
    return this.commandBus.execute(new RegisterAccountCommand(authCredentialsDto));
  }
}
