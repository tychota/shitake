import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from '@shitake/microservice-user/infrastructure/api/module';

import { ApplicationController } from './controller';

import pino from 'pino-http';

@Module({
  imports: [UserModule],
  controllers: [ApplicationController],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        pino({
          // Temporary hack
          // TODO: configure nest to use pino logger and then pipe to pretty-print
          prettyPrint: {
            levelFirst: true,
          },
        }),
      )
      .forRoutes('*');
  }
}
