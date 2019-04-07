import { LoggerService } from '@nestjs/common';
import pino from 'pino';

const log = pino();

export class NestLogger implements LoggerService {
  log(message: any, context?: string | undefined) {
    log.info({ context }, message);
  }
  error(message: any, trace?: string | undefined, context?: string | undefined) {
    log.error({ trace, context }, message);
  }
  warn(message: any, context?: string | undefined) {
    log.error({ context }, message);
  }
}
