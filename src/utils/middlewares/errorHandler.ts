import { ErrorResponse, ErrorCodeType } from '../../models/responses/ErrorResponse'
import logger from './logger'

export async function errorHandler(err, req, res, next) {
  res.status(500)

  const msg = `Internal server error: ${err.message || err}`

  logger.error(msg)

  res.json(new ErrorResponse(msg, ErrorCodeType.InternalError))
}
