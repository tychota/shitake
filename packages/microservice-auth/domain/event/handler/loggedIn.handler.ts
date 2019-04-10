import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { LoggedInEvent } from '@shitake/microservice-auth/domain/event';

import { EventstoreService } from '@shitake/storage-eventstore/eventstore.service';

@EventsHandler(LoggedInEvent)
export class LoggedInHandler implements IEventHandler<LoggedInEvent> {
  public constructor(private readonly eventstoreService: EventstoreService) {}

  public handle(event: LoggedInEvent) {
    this.eventstoreService.createEvent(event.uuid, 'User', { refreshToken: event.refreshToken }, 'loggedIn', {});
    // TODO dispatch event to external workers
  }
}
