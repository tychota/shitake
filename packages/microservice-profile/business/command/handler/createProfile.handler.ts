import uuid from 'uuid';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateProfileCommand } from '@shitake/microservice-profile/business/command';
import { Profile } from '@shitake/microservice-profile/domain/model';

@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler implements ICommandHandler<CreateProfileCommand> {
  public constructor(private readonly publisher: EventPublisher) {}

  public async execute(command: CreateProfileCommand) {
    const { userDto } = command;

    const user = this.publisher.mergeObjectContext(new Profile(uuid()));
    user.create(userDto);
    user.commit();
  }
}
