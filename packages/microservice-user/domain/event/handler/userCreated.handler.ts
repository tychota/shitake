import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserCreatedEvent } from '../interface/userCreated.event';
import { EventstoreService } from '@shitake/eventstore/eventstore.service';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly eventstoreService: EventstoreService) {}

  handle(event: UserCreatedEvent) {
    this.eventstoreService.createEvent(event.uuid, 'User', event.data, 'userCreated', {});
    console.log('user created', event);
    // TODO dispatch event to external workers
  }
}
