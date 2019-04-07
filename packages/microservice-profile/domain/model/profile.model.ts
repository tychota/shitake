import { AggregateRoot } from '@nestjs/cqrs';

import { ProfileDto } from '@shitake/microservice-profile/domain/dto';
import { ProfileCreatedEvent } from '@shitake/microservice-profile/domain/event/';

export class Profile extends AggregateRoot {
  constructor(private readonly uuid: string) {
    super();
  }

  create(createProfileDto: ProfileDto) {
    this.apply(new ProfileCreatedEvent(this.uuid, createProfileDto));
  }
}
