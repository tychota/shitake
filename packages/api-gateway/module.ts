import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { EventstoreModule } from '@shitake/storage-eventstore/eventstore.module';
import { AuthModule } from '@shitake/microservice-auth';
import { ProfileModule } from '@shitake/microservice-profile';

import { AuthGatewayController } from './controllers/auth.controller';
import { ProfileGatewayController } from './controllers/profile.controller';

import { RequestIdMiddleware } from './middlewares/reqId.middleware';

@Module({
  imports: [AuthModule, EventstoreModule, ProfileModule],
  controllers: [AuthGatewayController, ProfileGatewayController],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
