import { ProfileDto } from '@shitake/microservice-profile/domain/dto';

export class ProfileCreatedEvent {
  public constructor(public readonly uuid: string, public readonly data: ProfileDto) {}
}
