import { Observable } from 'rxjs';

import { Controller, Get, OnModuleInit, Post, Param, Body, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';

import { profileClientOptions } from '@shitake/microservice-profile/infrastructure/';
import { ProfileDto } from '@shitake/microservice-profile/domain/dto';

interface ProfileQuery {
  hello(data: { object: string }): Observable<{ greetings: string }>;
}

interface ProfileCommand {
  createProfile(dto: ProfileDto): Observable<void>;
}

@Controller('profile')
export class ProfileGatewayController implements OnModuleInit {
  @Client(profileClientOptions)
  private readonly profileClient!: ClientGrpc;

  private profileCommand!: ProfileCommand;

  onModuleInit() {
    this.profileCommand = this.profileClient.getService<ProfileCommand>('Command');
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createProfile(@Body() dto: ProfileDto) {
    return this.profileCommand.createProfile(dto);
  }
}
