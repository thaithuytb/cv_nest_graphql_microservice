import { RpcException } from '@nestjs/microservices';

const resolveError = (error: any) => {
  console.log(error.error);
  const statusCode = error.error.code;
  if (statusCode == 400 || statusCode === 403 || statusCode === 404) {
    throw new RpcException(error.error);
  } else {
    throw new RpcException({
      message: 'Internal server',
      code: 500,
    });
  }
};

export default resolveError;
