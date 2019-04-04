import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from '../../business/user.service';
import { UserDto } from '../../domain/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('Query')
  hello({ object }: { object: string }): { greeting: string } {
    return { greeting: `hello ${object}` };
  }

  @GrpcMethod('Command')
  async createUser(userDto: UserDto) {
    await this.userService.createUser(userDto);
  }
}
