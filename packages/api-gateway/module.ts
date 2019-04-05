import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from '@shitake/microservice-user/user.module';

import { ApplicationController } from './controller';

import { EventstoreModule } from '../eventstore/eventstore.module';

@Module({
  imports: [UserModule, EventstoreModule],
  controllers: [ApplicationController],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(
    //     pino({
    //       // Temporary hack
    //       // TODO: configure nest to use pino logger and then pipe to pretty-print
    //       prettyPrint: {
    //         levelFirst: true,
    //       },
    //     }),
    //   )
    //   .forRoutes('*');
  }
}
