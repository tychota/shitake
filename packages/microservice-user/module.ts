import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserController } from './infrastructure/api/controller';
import { UserService } from './business/service';
import { UserCommandHandlers } from './business/command/handler';
import { UserEventHandlers } from './domain/event/handler';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [UserService, ...UserCommandHandlers, ...UserEventHandlers],
})
export class UserModule {}
