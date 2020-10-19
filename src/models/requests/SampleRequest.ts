import { Request } from 'express'

export interface SampleRequest extends Request {
  body: {
    id: string
  }
}
