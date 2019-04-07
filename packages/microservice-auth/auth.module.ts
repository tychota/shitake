import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './infrastructure/api/auth.controller';
import { AuthService } from './business/auth.service';
import { AuthCommandHandlers } from './business/command/handler';
import { AuthEventHandlers } from './domain/event/handler';
import { AuthSagas } from './business/sagas/updateQuery.saga';
import { AuthQueryHandlers } from './business/query/handler';
import { AccountEntity } from './infrastructure/persistance/entity/account.entity';

import { EventstoreService } from '@shitake/storage-eventstore/eventstore.service';
import { TypeormLogger } from '@shitake/utils-logger/typeorm.logger';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot({
      name: 'accountConnection',
      type: 'postgres',
      url: 'postgres://shitake:password@localhost/accounts',
      entities: [AccountEntity],
      synchronize: true,
      logging: true,
      logger: new TypeormLogger(),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ...AuthCommandHandlers,
    ...AuthEventHandlers,
    ...AuthQueryHandlers,
    AuthSagas,
    EventstoreService,
  ],
})
export class AuthModule {}
