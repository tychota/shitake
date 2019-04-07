import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { AuthService } from '@shitake/microservice-auth/business/auth.service';
import { AuthClearTextCredentialsDto } from '@shitake/microservice-auth/domain/dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('Command')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(authCredentialsDto: AuthClearTextCredentialsDto) {
    const accountId = await this.authService.register(authCredentialsDto);
    return { id: accountId };
  }
}
