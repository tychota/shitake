import { ProfileDto } from '@shitake/microservice-profile/domain/dto';

export class ProfileCreatedEvent {
  constructor(public readonly uuid: string, public readonly data: ProfileDto) {}
}
