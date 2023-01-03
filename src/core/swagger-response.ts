/* eslint-disable @typescript-eslint/ban-types */
import { HttpStatus, Type } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import ApiExceptionTyping from 'src/typings/api-exception.typing.entity';

function ok(
  type?: Type<unknown> | Function | [Function] | string,
): ApiResponseOptions {
  return {
    status: HttpStatus.OK,
    description: 'success',
    type,
  };
}

const inputValidationError: ApiResponseOptions = {
  status: HttpStatus.BAD_REQUEST,
  description: 'input validation error',
  type: ApiExceptionTyping,
};

const internalError: ApiResponseOptions = {
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'internal server error',
  type: ApiExceptionTyping,
};

const notFound: ApiResponseOptions = {
  status: HttpStatus.NOT_FOUND,
  description: 'not found',
  type: ApiExceptionTyping,
};

export const SwaggerResponse = {
  Ok: ok,
  InputValidationError: inputValidationError,
  InternalError: internalError,
  NotFound: notFound,
};
