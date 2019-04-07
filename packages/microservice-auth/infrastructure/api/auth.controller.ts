import { Controller, UsePipes, ValidationPipe, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { AuthService } from '@shitake/microservice-auth/business/auth.service';
import { AuthClearTextCredentialsDto } from '@shitake/microservice-auth/domain/dto';

import { formatGrpcResponse } from '@shitake/utils-grpc/formatGrpcResponse';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('Command')
  async register(authCredentialsDto: AuthClearTextCredentialsDto) {
    const serviceFn = this.authService.register.bind(this.authService);
    return formatGrpcResponse(serviceFn, [authCredentialsDto]);
  }

  @GrpcMethod('Command')
  async login(authCredentialsDto: AuthClearTextCredentialsDto) {
    const serviceFn = this.authService.login.bind(this.authService);
    return formatGrpcResponse(serviceFn, [authCredentialsDto]);
  }
}
