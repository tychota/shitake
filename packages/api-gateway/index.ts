import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { NestLogger } from '@shitake/utils-logger/nest.logger';

import { ApplicationModule } from './module';

declare const module: unknown;

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ApplicationModule, { logger: new NestLogger() });

  const { profileClientOptions } = await import('@shitake/microservice-profile/infrastructure');
  const { authClientOptions } = await import('@shitake/microservice-auth/infrastructure');

  app.connectMicroservice(profileClientOptions);
  app.connectMicroservice(authClientOptions);

  app.startAllMicroservices();

  app.use(helmet());
  app.use(
    new rateLimit({
      windowMs: 0.5 * 60 * 1000, // 30sec
      max: 100, // limit each IP to 300 requests per windowMs
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Shitake')
    .setDescription('A CRQS Test')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
