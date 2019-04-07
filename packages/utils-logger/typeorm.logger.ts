import { Logger, QueryRunner } from 'typeorm';
import pino from 'pino';

const log = pino().child({ context: 'TypeOrm' });

export class TypeormLogger implements Logger {
  logQuery(query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    log.debug({ parameters }, query);
  }
  logQueryError(error: string, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    log.error({ query, parameters }, error);
  }
  logQuerySlow(time: number, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    log.warn({ query, parameters, time }, time.toString());
  }
  logSchemaBuild(message: string, queryRunner?: QueryRunner | undefined) {
    log.error({ message }, message);
  }
  logMigration(message: string, queryRunner?: QueryRunner | undefined) {
    log.error({ message }, message);
  }
  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner | undefined) {
    let logFn;
    switch (level) {
      case 'log':
        logFn = log.debug;
        break;
      case 'info':
        logFn = log.info;
        break;
      case 'warn':
        logFn = log.warn;
        break;
    }
    log.error({ message }, message);
  }

  // implement all methods from logger class
}
