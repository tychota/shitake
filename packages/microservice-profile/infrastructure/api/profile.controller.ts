import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { ProfileService } from '@shitake/microservice-profile/business/profile.service';
import { ProfileDto } from '@shitake/microservice-profile/domain/dto';

@Controller()
export class ProfileController {
  public constructor(private readonly profileService: ProfileService) {}

  @GrpcMethod('Command')
  public async createProfile(profileDto: ProfileDto) {
    await this.profileService.createProfile(profileDto);
  }
}
