import { ProfileDto } from '@shitake/microservice-profile/domain/dto';

export class CreateProfileCommand {
  constructor(public readonly userDto: ProfileDto) {}
}
