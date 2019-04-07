import { NestFactory } from '@nestjs/core';
import { NestLogger } from '@shitake/utils-logger/nest.logger';

import { ApplicationModule } from './module';

import { profileClientOptions } from '@shitake/microservice-profile/infrastructure';
import { authClientOptions } from '@shitake/microservice-auth/infrastructure';

declare const module: any;

export async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, { logger: new NestLogger() });

  app.connectMicroservice(profileClientOptions);
  app.connectMicroservice(authClientOptions);

  await app.startAllMicroservicesAsync();

  await app.listen(3001);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
