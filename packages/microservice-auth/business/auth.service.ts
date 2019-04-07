import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AuthClearTextCredentialsDto } from '@shitake/microservice-auth/domain/dto';
import { RegisterAccountCommand } from '@shitake/microservice-auth/business/command';
import { DoesEmailExistQuery } from '@shitake/microservice-auth/business/query/';

import { GrpcAlreadyExistException } from '@shitake/utils-grpc/exception';

@Injectable()
export class AuthService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async register(authCredentialsDto: AuthClearTextCredentialsDto) {
    await this.assertEmailDoesNotExist(authCredentialsDto.email);
    const id = await this.commandBus.execute(new RegisterAccountCommand(authCredentialsDto));
    return { id };
  }

  async assertEmailDoesNotExist(email: string) {
    const emailAlreadyExist = await this.queryBus.execute(new DoesEmailExistQuery(email));
    if (emailAlreadyExist) {
      throw new GrpcAlreadyExistException('Email already exist');
    }
  }
}
