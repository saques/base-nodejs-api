import { Request, Response, NextFunction } from 'express'
import { ErrorCodeType, ResponseError } from '../../models/responses/ResponseError'

export async function bodyValidator(req: Request, res: Response, next: NextFunction) {
  const { id } = req.body

  if (!id) {
    const msg = 'Body must contain property "id"'
    return res.status(400).json(new ResponseError(msg, ErrorCodeType.InvalidBody))
  }

  next()
}
