import { UserDto } from '../../../domain/user.dto';

export class CreateUserCommand {
  constructor(public readonly userDto: UserDto) {}
}
