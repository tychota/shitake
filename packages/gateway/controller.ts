import { Observable } from 'rxjs';

import { Controller, Get, OnModuleInit, Post, Param, Body } from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';

import { userClientOptions } from '@shitake/microservice-user/infrastructure/api/client';
import { UserDto } from '@shitake/microservice-user/domain/user.dto';

interface UserQuery {
  hello(data: { object: string }): Observable<{ greetings: string }>;
}

interface UserCommand {
  createUser(dto: UserDto): Observable<void>;
}

@Controller()
export class ApplicationController implements OnModuleInit {
  @Client(userClientOptions)
  private readonly userClient!: ClientGrpc;

  private userQuery!: UserQuery;
  private userCommand!: UserCommand;

  onModuleInit() {
    this.userQuery = this.userClient.getService<UserQuery>('Query');
    this.userCommand = this.userClient.getService<UserCommand>('Command');
  }

  @Get()
  hello(): Promise<{ greetings: string }> {
    return this.userQuery.hello({ object: 'world' }).toPromise();
  }

  @Post()
  async createUser(@Body() dto: UserDto) {
    return this.userCommand.createUser(dto);
  }
}
