import grpc from 'grpc';

import { GrpcException } from './exception';
import { GrpcStatus, GrpcAnswer } from './types';

export const formatGrpcResponse = async <P extends unknown[], R>(
  service: (...args: P) => Promise<R>,
  args: P,
): Promise<GrpcAnswer<R>> => {
  let data: R = ({} as unknown) as R;
  let status: GrpcStatus;
  try {
    data = await service(...args);
    status = { code: grpc.status.OK };
  } catch (e) {
    if (e instanceof GrpcException) {
      status = { code: e.code, message: e.message };
    } else {
      throw e;
    }
  }
  return { data, status };
};
