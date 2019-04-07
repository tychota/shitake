import { Controller, UsePipes, ValidationPipe, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import grpc from 'grpc';

import { AuthService, EmailAlreadyExistException } from '@shitake/microservice-auth/business/auth.service';
import { AuthClearTextCredentialsDto } from '@shitake/microservice-auth/domain/dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('Command')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(authCredentialsDto: AuthClearTextCredentialsDto) {
    let data;
    let status;
    try {
      const accountId = await this.authService.register(authCredentialsDto);
      data = { id: accountId };
      status = { code: grpc.status.OK };
    } catch (e) {
      if (e instanceof EmailAlreadyExistException) {
        status = { code: grpc.status.ALREADY_EXISTS, message: 'Email already exist' };
      }
    } finally {
      return { data, status };
    }
  }
}
