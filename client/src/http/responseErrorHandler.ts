import axios, { AxiosError } from 'axios';
import { ResponseError } from '../models/response/ErrorRespose';

export function responseErrorHandler(err: any | unknown) {
  console.warn(err)
  const error = err as AxiosError<ResponseError>
  const unexpectedError = 'Unexpected error, try again later...'

  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || unexpectedError
  }

  throw error
}
