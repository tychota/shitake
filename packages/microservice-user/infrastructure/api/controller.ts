import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class UserController {
  @GrpcMethod('Query')
  hello({ object }: { object: string }): { greeting: string } {
    return { greeting: `hello ${object}` };
  }
}
