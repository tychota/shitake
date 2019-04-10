import { ProfileDto } from '@shitake/microservice-profile/domain/dto';

export class CreateProfileCommand {
  public constructor(public readonly userDto: ProfileDto) {}
}
