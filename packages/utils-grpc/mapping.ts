import grpc from 'grpc';
import {
  HttpException,
  InternalServerErrorException,
  HttpStatus,
  BadRequestException,
  GatewayTimeoutException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { isObject } from 'util';

const createHttpExceptionBody = (message: object | string, error?: string, statusCode?: number) => {
  if (!message) {
    return { statusCode, error };
  }
  return isObject(message) && !Array.isArray(message) ? message : { statusCode, error, message };
};

const createHttpException = (status: number, defaultError: string = '') => {
  class CustomHttpException extends HttpException {
    constructor(message?: string | object | any, error = defaultError) {
      super(createHttpExceptionBody(message, error, status), status);
    }
  }
  return CustomHttpException;
};

export const GrpcToHttpExceptionMapping = {
  [grpc.status.OK]: null,
  [grpc.status.CANCELLED]: createHttpException(499, 'Client Closed Request'),
  [grpc.status.UNKNOWN]: InternalServerErrorException,
  [grpc.status.INVALID_ARGUMENT]: BadRequestException,
  [grpc.status.DEADLINE_EXCEEDED]: GatewayTimeoutException,
  [grpc.status.NOT_FOUND]: NotFoundException,
  [grpc.status.ALREADY_EXISTS]: ConflictException,
  [grpc.status.PERMISSION_DENIED]: ForbiddenException,
  [grpc.status.UNAUTHENTICATED]: UnauthorizedException,
  [grpc.status.RESOURCE_EXHAUSTED]: createHttpException(HttpStatus.TOO_MANY_REQUESTS, 'Too Many Request'),
  [grpc.status.FAILED_PRECONDITION]: BadRequestException,
  [grpc.status.DEADLINE_EXCEEDED]: GatewayTimeoutException,
  [grpc.status.ABORTED]: ConflictException,
  [grpc.status.OUT_OF_RANGE]: BadRequestException,
  [grpc.status.UNIMPLEMENTED]: createHttpException(501, 'Not Implemented'),
  [grpc.status.INTERNAL]: InternalServerErrorException,
  [grpc.status.UNAVAILABLE]: ServiceUnavailableException,
  [grpc.status.DATA_LOSS]: InternalServerErrorException,
};
