import { Injectable, NestMiddleware } from '@nestjs/common';
import uuid from 'uuid';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  public use(req: Request & { id: string }, res: Response, next: NextFunction): void {
    const reqId = req.headers['X-Request-Id'] && req.headers['X-Request-Id'];
    req.id = (reqId && reqId.toString()) || uuid.v4();
    res.setHeader('X-Request-Id', req.id);
    next();
  }
}
