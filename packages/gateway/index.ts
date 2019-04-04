import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './module';
import { userClientOptions } from '@shitake/microservice-user/infrastructure/api/client';

declare const module: any;

export async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  app.connectMicroservice(userClientOptions);
  await app.startAllMicroservicesAsync();

  await app.listen(3001);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
