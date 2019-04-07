import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeormLogger } from '@shitake/utils-logger/typeorm.logger';

import { Event } from './entity/event.entity';
import { Stream } from './entity/stream.entity';
import { EventstoreService } from './eventstore.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'eventConnection',
      type: 'postgres',
      url: 'postgres://shitake:password@localhost/events',
      entities: [Event, Stream],
      synchronize: true,
      logging: true,
      logger: new TypeormLogger(),
    }),
  ],
  providers: [EventstoreService],
  exports: [EventstoreService],
})
export class EventstoreModule {}
