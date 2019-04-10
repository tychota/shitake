import grpc from 'grpc';

export interface GrpcStatus {
  code: grpc.status;
  message?: string;
  details?: unknown[];
}

export interface GrpcAnswer<T extends unknown = unknown> {
  status: GrpcStatus;
  data: T;
}
