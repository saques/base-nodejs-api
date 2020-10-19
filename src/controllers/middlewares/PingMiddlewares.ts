import { Request, Response, NextFunction } from 'express'
import { ErrorCodeType, ErrorResponse } from '../../models/responses/ErrorResponse'

export async function bodyValidator(req: Request, res: Response, next: NextFunction) {
  const { id } = req.body

  if (!id) {
    const msg = 'Body must contain property "id"'
    return res.status(400).json(new ErrorResponse(msg, ErrorCodeType.InvalidBody))
  }

  next()
}
