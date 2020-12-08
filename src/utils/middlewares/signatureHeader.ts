import { Request, Response, NextFunction } from 'express'

const SIGNATURE = 'no-signature'

export const signatureHeader = (req: Request, res: Response, next: NextFunction) => {
  res.set('X-Signature-Id', SIGNATURE)
  next()
}
