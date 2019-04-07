import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './module';
import { userClientOptions } from '@shitake/microservice-user/infrastructure/api/user.client';
import { NestLogger } from '@shitake/utils-logger/nest.logger';

declare const module: any;

export async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, { logger: new NestLogger() });

  app.connectMicroservice(userClientOptions);
  await app.startAllMicroservicesAsync();

  await app.listen(3001);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
