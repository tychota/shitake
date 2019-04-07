import { GrpcAnswer } from './types';
import { GrpcToHttpExceptionMapping } from './mapping';
import { InternalServerErrorException } from '@nestjs/common';

export const formatHttpResponse = async <P>(grpcAnswer: GrpcAnswer<P>): Promise<{ data: P }> => {
  if (grpcAnswer.status.code !== 0) {
    const exception = GrpcToHttpExceptionMapping[grpcAnswer.status.code] || InternalServerErrorException;
    throw new exception(grpcAnswer.status.message || 'Unknown');
  }
  return { data: grpcAnswer.data };
};
