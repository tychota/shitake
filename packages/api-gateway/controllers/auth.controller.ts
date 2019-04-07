import { Observable } from 'rxjs';
import grpc from 'grpc';

import {
  Controller,
  OnModuleInit,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  ConflictException,
  HttpException,
} from '@nestjs/common';
import { ApiUseTags, ApiCreatedResponse, ApiBadRequestResponse, ApiConflictResponse } from '@nestjs/swagger';
import { ClientGrpc, Client } from '@nestjs/microservices';

import { authClientOptions } from '@shitake/microservice-auth/infrastructure/';
import { AuthClearTextCredentialsDto } from '@shitake/microservice-auth/domain/dto';
import { GrpcAnswer } from '@shitake/utils-grpc/types';
import { formatHttpResponse } from '@shitake/utils-grpc/formatHttpResponse';

interface AuthCommand {
  register(dto: AuthClearTextCredentialsDto): Observable<GrpcAnswer>;
}

@ApiUseTags('auth')
@Controller('auth')
export class AuthGatewayController implements OnModuleInit {
  @Client(authClientOptions)
  private readonly authClient!: ClientGrpc;

  private authCommand!: AuthCommand;

  onModuleInit() {
    this.authCommand = this.authClient.getService<AuthCommand>('Command');
  }

  @ApiCreatedResponse({ description: 'The account has been successfully created.' })
  @ApiBadRequestResponse({ description: 'The format of the body is incorrect. We need a valid email and a password.' })
  @ApiConflictResponse({ description: 'The email already exist. Try to login instead.' })
  @Post('/register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() dto: AuthClearTextCredentialsDto) {
    const grpcAnswer = await this.authCommand.register(dto).toPromise();
    return formatHttpResponse(grpcAnswer);
  }
}
