import { Observable } from 'rxjs';

import { Controller, OnModuleInit, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiUseTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ClientGrpc, Client } from '@nestjs/microservices';

import { authClientOptions } from '@shitake/microservice-auth/infrastructure/';
import { AuthClearTextCredentialsDto } from '@shitake/microservice-auth/domain/dto';
import { GrpcAnswer } from '@shitake/utils-grpc/types';
import { formatHttpResponse } from '@shitake/utils-grpc/formatHttpResponse';

import { ControllerResponse } from '../types';

interface AuthCommand {
  register(dto: AuthClearTextCredentialsDto): Observable<GrpcAnswer<{ id: string }>>;
  login(dto: AuthClearTextCredentialsDto): Observable<GrpcAnswer>;
}

@ApiUseTags('auth')
@Controller('auth')
export class AuthGatewayController implements OnModuleInit {
  @Client(authClientOptions)
  private readonly authClient!: ClientGrpc;

  private authCommand!: AuthCommand;

  public onModuleInit(): void {
    this.authCommand = this.authClient.getService<AuthCommand>('Command');
  }

  @ApiCreatedResponse({ description: 'The account has been successfully created.' })
  @ApiBadRequestResponse({ description: 'The format of the body is incorrect. We need a valid email and a password.' })
  @ApiConflictResponse({ description: 'The email already exist. Try to login instead.' })
  @Post('/register')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async register(@Body() dto: AuthClearTextCredentialsDto): ControllerResponse {
    const grpcAnswer = await this.authCommand.register(dto).toPromise();
    return formatHttpResponse(grpcAnswer);
  }

  @ApiCreatedResponse({ description: 'The account has been successfully created.' })
  @ApiBadRequestResponse({ description: 'The format of the body is incorrect. We need a valid email and a password.' })
  @ApiUnauthorizedResponse({ description: 'The email or the password is incorrect' })
  @Post('/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async login(@Body() dto: AuthClearTextCredentialsDto): ControllerResponse {
    const grpcAnswer = await this.authCommand.login(dto).toPromise();
    return formatHttpResponse(grpcAnswer);
  }
}
