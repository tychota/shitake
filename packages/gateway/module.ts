import { Module } from '@nestjs/common';
import { UserModule } from '@shitake/microservice-user/infrastructure/api/module';

import { ApplicationController } from './controller';

@Module({
  imports: [UserModule],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
