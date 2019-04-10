import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AccountRegistredEvent } from '@shitake/microservice-auth/domain/event';

import { EventstoreService } from '@shitake/storage-eventstore/eventstore.service';

@EventsHandler(AccountRegistredEvent)
export class AccountRegistredHandler implements IEventHandler<AccountRegistredEvent> {
  public constructor(private readonly eventstoreService: EventstoreService) {}

  public handle(event: AccountRegistredEvent) {
    this.eventstoreService.createEvent(event.uuid, 'User', event.data, 'accountRegistred', {});
    // TODO dispatch event to external workers
  }
}
