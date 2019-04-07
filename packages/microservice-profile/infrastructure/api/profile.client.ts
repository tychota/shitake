import * as path from 'path';

import { ClientOptions, Transport } from '@nestjs/microservices';

export const profileClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'profile',
    protoPath: path.join(__dirname, './profile.proto'),
  },
};
