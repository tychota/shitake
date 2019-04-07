import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AuthClearTextCredentialsDto } from '@shitake/microservice-auth/domain/dto';
import { RegisterAccountCommand } from '@shitake/microservice-auth/business/command';
import { DoesEmailExistQuery } from '@shitake/microservice-auth/business/query/';

export class EmailAlreadyExistException extends Error {}

@Injectable()
export class AuthService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async register(authCredentialsDto: AuthClearTextCredentialsDto) {
    await this.assertEmailDoesNotExist(authCredentialsDto.email);
    return this.commandBus.execute(new RegisterAccountCommand(authCredentialsDto));
  }

  async assertEmailDoesNotExist(email: string) {
    const emailAlreadyExist = await this.queryBus.execute(new DoesEmailExistQuery(email));
    if (emailAlreadyExist) {
      throw new EmailAlreadyExistException();
    }
  }
}
