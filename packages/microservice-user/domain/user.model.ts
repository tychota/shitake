import { AggregateRoot } from '@nestjs/cqrs';

import { UserDto } from './user.dto';
import { UserCreatedEvent } from './event/interface/userCreated.event';

export class User extends AggregateRoot {
  constructor(private readonly uuid: string) {
    super();
  }

  create(createUserDto: UserDto) {
    this.apply(new UserCreatedEvent(this.uuid, createUserDto));
  }
}
