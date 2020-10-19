import * as bodyParser from 'body-parser'
import { ErrorResponse, ErrorCodeType } from '../../models/responses/ErrorResponse'
import logger from './logger'

export function jsonParser() {
  return (req, res, next) => {
    bodyParser.json()(req, res, (err) => {
      if (err) {
        logger.error(err)
        return res.status(400).json(new ErrorResponse(err.toString(), ErrorCodeType.InvalidBody))
      }

      next()
    })
  }
}
