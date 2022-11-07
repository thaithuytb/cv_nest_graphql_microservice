import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50001',
    package: 'user',
    protoPath: join(__dirname + '/user/user.proto'),
  },
};
