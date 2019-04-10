import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AuthClearTextCredentialsDto } from '@shitake/microservice-auth/domain/dto';
import { RegisterAccountCommand, LoginCommand } from '@shitake/microservice-auth/business/command';
import { DoesEmailExistQuery, GetUserIdAfterValidationQuery } from '@shitake/microservice-auth/business/query/';

import { GrpcAlreadyExistException } from '@shitake/utils-grpc/exception';

@Injectable()
export class AuthService {
  public constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  public async register(authCredentialsDto: AuthClearTextCredentialsDto) {
    await this.assertEmailDoesNotExist(authCredentialsDto.email);
    const id = await this.commandBus.execute(new RegisterAccountCommand(authCredentialsDto));
    return { id };
  }

  public async login(authCredentialsDto: AuthClearTextCredentialsDto) {
    const id = await this.queryBus.execute<GetUserIdAfterValidationQuery, string>(
      new GetUserIdAfterValidationQuery(authCredentialsDto),
    );
    const { authToken, refreshToken } = await this.commandBus.execute(new LoginCommand(id));
    return { authToken, refreshToken, id };
  }

  public async assertEmailDoesNotExist(email: string) {
    const emailAlreadyExist = await this.queryBus.execute(new DoesEmailExistQuery(email));
    if (emailAlreadyExist) {
      throw new GrpcAlreadyExistException('Email already exist');
    }
  }
}
