import { StatusType } from './StatusType'

export enum ErrorCodeType {
  MissingHeader = 'MISSING_HEADER',
  InvalidHeader = 'INVALID_HEADER',
  InvalidBody = 'INVALID_BODY',
  InvalidPath = 'INVALID_PATH',
  InternalError = 'INTERNAL_ERROR',
}

type ErrorType = {
  message: string
  code: ErrorCodeType
}

export class ResponseError {
  status: StatusType = 'error'
  error: ErrorType

  constructor(msg: string, errorCode: ErrorCodeType) {
    this.error = { message: msg, code: errorCode }
  }
}
