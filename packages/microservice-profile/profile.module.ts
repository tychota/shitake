import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProfileController } from './infrastructure/api/profile.controller';
import { ProfileService } from './business/profile.service';
import { ProfileCommandHandlers } from './business/command/handler';
import { ProfileEventHandlers } from './domain/event/handler';

import { EventstoreService } from '@shitake/storage-eventstore/eventstore.service';

@Module({
  imports: [CqrsModule],
  controllers: [ProfileController],
  providers: [ProfileService, ...ProfileCommandHandlers, ...ProfileEventHandlers, EventstoreService],
})
export class ProfileModule {}
