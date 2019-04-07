import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { EventstoreModule } from '@shitake/storage-eventstore/eventstore.module';
import { ProfileModule } from '@shitake/microservice-profile';

import { ProfileGatewayController } from './controllers/profile.controller';

import { RequestIdMiddleware } from './middlewares/reqId.middleware';

@Module({
  imports: [ProfileModule, EventstoreModule],
  controllers: [ProfileGatewayController],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
