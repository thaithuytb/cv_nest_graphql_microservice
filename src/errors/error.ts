import { HttpException, HttpStatus } from '@nestjs/common';

const resolveError = (error: any) => {
  if (error.status === 400) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  } else if (error.status === 404) {
    throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  } else if (error.status === 403) {
    throw new HttpException(error.message, HttpStatus.FORBIDDEN);
  } else {
    throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export default resolveError;
