import { Observable } from 'rxjs';

import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';

import { userClientOptions } from '@shitake/microservice-user/infrastructure/api/client';

interface UserQuery {
  hello(data: { object: string }): Observable<{ greetings: string }>;
}

@Controller()
export class ApplicationController implements OnModuleInit {
  @Client(userClientOptions)
  private readonly userClient!: ClientGrpc;

  private userQuery!: UserQuery;

  onModuleInit() {
    this.userQuery = this.userClient.getService<UserQuery>('Query');
  }

  @Get()
  hello(object: string): Promise<{ greetings: string }> {
    return this.userQuery.hello({ object: 'world' }).toPromise();
  }
}
