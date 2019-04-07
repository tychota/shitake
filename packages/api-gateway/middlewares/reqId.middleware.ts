import { Injectable, NestMiddleware } from '@nestjs/common';
import uuid from 'uuid';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  public use(req: any, res: any, next: any) {
    req.id = req.headers['X-Request-Id'] || uuid.v4();
    res.setHeader('X-Request-Id', req.id);
    next();
  }
}
