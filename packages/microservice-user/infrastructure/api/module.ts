import { Module } from '@nestjs/common';
import { UserController } from './controller';

@Module({
  controllers: [UserController],
})
export class UserModule {}
