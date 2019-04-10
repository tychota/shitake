import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { NestLogger } from '@shitake/utils-logger/nest.logger';

import { ApplicationModule } from './module';

declare const module: any;

export async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, { logger: new NestLogger() });

  const { profileClientOptions } = await import('@shitake/microservice-profile/infrastructure');
  const { authClientOptions } = await import('@shitake/microservice-auth/infrastructure');

  app.connectMicroservice(profileClientOptions);
  app.connectMicroservice(authClientOptions);

  await app.startAllMicroservicesAsync();

  const options = new DocumentBuilder()
    .setTitle('Shitake')
    .setDescription('A CRQS Test')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);

  if (module.hot) {
    console.log('aaaa');
    module.hot.accept(() => console.log('bbbb'));
    module.hot.dispose(() => {
      console.log('cccc');
      app.close();
    });
  }
}
