import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { UserModule } from '@shitake/microservice-user/user.module';

import { UserGatewayController } from './controllers/user.controller';

import { EventstoreModule } from '@shitake/storage-eventstore/eventstore.module';
import { RequestIdMiddleware } from './middlewares/reqId.middleware';

@Module({
  imports: [UserModule, EventstoreModule],
  controllers: [UserGatewayController],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
