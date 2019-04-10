import grpc from 'grpc';

export class GrpcException extends Error {
  public readonly message: string;
  public constructor(public readonly code: number, private readonly error: string | object) {
    super();
    this.message = error.toString();
  }
  public getError() {
    return this.error;
  }
}

export class GrpcCanceledException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.CANCELLED, error);
  }
}

export class GrpcUnkownException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.UNKNOWN, error);
  }
}

export class GrpcInvalidArgumentException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.INVALID_ARGUMENT, error);
  }
}

export class GrpcDeadlineExceededException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.DEADLINE_EXCEEDED, error);
  }
}

export class GrpcNotFoundException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.NOT_FOUND, error);
  }
}

export class GrpcAlreadyExistException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.ALREADY_EXISTS, error);
  }
}

export class GrpcPermissionDeniedException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.PERMISSION_DENIED, error);
  }
}

export class GrpcUnauthenticatedException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.UNAUTHENTICATED, error);
  }
}

export class GrpcRessourceExhaustedException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.RESOURCE_EXHAUSTED, error);
  }
}

export class GrpcFailedPreconditionException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.FAILED_PRECONDITION, error);
  }
}

export class GrpcAbortedException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.ABORTED, error);
  }
}

export class GrpcOutOfRangeException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.OUT_OF_RANGE, error);
  }
}

export class GrpcUnimplementedException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.UNIMPLEMENTED, error);
  }
}

export class GrpcInternalException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.CANCELLED, error);
  }
}

export class GrpcUnavailableException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.UNAVAILABLE, error);
  }
}

export class GrpcDataLossException extends GrpcException {
  public constructor(error: string | object) {
    super(grpc.status.DATA_LOSS, error);
  }
}
