import { Observable } from 'rxjs';

import { Controller, OnModuleInit, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';

import { profileClientOptions } from '@shitake/microservice-profile/infrastructure/';
import { ProfileDto } from '@shitake/microservice-profile/domain/dto';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

interface ProfileCommand {
  createProfile(dto: ProfileDto): Observable<void>;
}

@ApiUseTags('profile')
@Controller('profile')
export class ProfileGatewayController implements OnModuleInit {
  @Client(profileClientOptions)
  private readonly profileClient!: ClientGrpc;

  private profileCommand!: ProfileCommand;

  onModuleInit() {
    this.profileCommand = this.profileClient.getService<ProfileCommand>('Command');
  }

  @ApiCreatedResponse({ description: 'The account has been successfully created.' })
  @ApiBadRequestResponse({ description: 'The format of the body is incorrect. We need an email and a password.' })
  @ApiUnauthorizedResponse({ description: 'You are not logged.' })
  @ApiForbiddenResponse({ description: 'You are not authorized to create a profile.' })
  @ApiBearerAuth()
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createProfile(@Body() dto: ProfileDto) {
    return this.profileCommand.createProfile(dto);
  }
}
