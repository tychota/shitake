import grpc from 'grpc';

export class GrpcException extends Error {
  public readonly message: string;
  constructor(public readonly code: number, private readonly error: string | object) {
    super();
    this.message = error.toString();
  }
  getError() {
    return this.error;
  }
}

export class GrpcCanceledException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.CANCELLED, error);
  }
}

export class GrpcUnkownException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.UNKNOWN, error);
  }
}

export class GrpcInvalidArgumentException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.INVALID_ARGUMENT, error);
  }
}

export class GrpcDeadlineExceededException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.DEADLINE_EXCEEDED, error);
  }
}

export class GrpcNotFoundException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.NOT_FOUND, error);
  }
}

export class GrpcAlreadyExistException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.ALREADY_EXISTS, error);
  }
}

export class GrpcPermissionDeniedException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.PERMISSION_DENIED, error);
  }
}

export class GrpcUnauthenticatedException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.UNAUTHENTICATED, error);
  }
}

export class GrpcRessourceExhaustedException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.RESOURCE_EXHAUSTED, error);
  }
}

export class GrpcFailedPreconditionException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.FAILED_PRECONDITION, error);
  }
}

export class GrpcAbortedException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.ABORTED, error);
  }
}

export class GrpcOutOfRangeException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.OUT_OF_RANGE, error);
  }
}

export class GrpcUnimplementedException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.UNIMPLEMENTED, error);
  }
}

export class GrpcInternalException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.CANCELLED, error);
  }
}

export class GrpcUnavailableException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.UNAVAILABLE, error);
  }
}

export class GrpcDataLossException extends GrpcException {
  constructor(error: string | object) {
    super(grpc.status.DATA_LOSS, error);
  }
}
