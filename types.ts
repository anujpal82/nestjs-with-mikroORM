export type ResponseReturnType<T> = {
    hasError: boolean;
    error: {
        type: 'UnknownRuntimeError' | 'BadRequestException' | 'NotFoundException' | 'BadGatewayException' | 'InternalServerException' | 'ConflictException' | 'UnauthorizedException' | 'PermissionDeniedException';
        message: string;
    }|null;
    data: T|null;
    code :number
};

