import * as path from 'path';

import { ClientOptions, Transport } from '@nestjs/microservices';

export const authClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50501',
    package: 'auth',
    protoPath: path.join(__dirname, './auth.proto'),
  },
};
