import grpc from 'grpc';

export interface GrpcStatus {
  code: grpc.status;
  message?: string;
  details?: any[];
}

export interface GrpcAnswer<T extends unknown = unknown> {
  status: GrpcStatus;
  data: T;
}
