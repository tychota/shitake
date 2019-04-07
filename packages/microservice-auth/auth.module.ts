import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthController } from './infrastructure/api/auth.controller';
import { AuthService } from './business/auth.service';
import { AuthCommandHandlers } from './business/command/handler';
import { AuthEventHandlers } from './domain/event/handler';

import { EventstoreService } from '@shitake/storage-eventstore/eventstore.service';

@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [AuthService, ...AuthCommandHandlers, ...AuthEventHandlers, EventstoreService],
})
export class ProfileModule {}
