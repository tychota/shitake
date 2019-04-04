import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UserController {
  @GrpcMethod('Query')
  hello({ object }: { object: string }): { greeting: string } {
    return { greeting: `hello ${object}` };
  }
}
