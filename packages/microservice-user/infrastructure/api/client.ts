import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const userClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: join(__dirname, './service.proto'),
  },
};
