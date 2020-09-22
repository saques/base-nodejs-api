import * as bodyParser from 'body-parser'
import { ResponseError, ErrorCodeType } from '../../models/responses/ResponseError'
import logger from './logger'

export function jsonParser() {
  return (req, res, next) => {
    bodyParser.json()(req, res, (err) => {
      if (err) {
        logger.error(err)
        return res.status(400).json(new ResponseError(err.toString(), ErrorCodeType.InvalidBody))
      }

      next()
    })
  }
}
