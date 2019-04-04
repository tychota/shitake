import { UserDto } from '../../user.dto';

export class UserCreatedEvent {
  constructor(public readonly uuid: string, public readonly data: UserDto) {}
}
