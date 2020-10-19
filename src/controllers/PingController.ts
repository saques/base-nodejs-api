import { Request, Response } from 'express'
import { Controller, Get, Middleware, Post } from '@overnightjs/core'
import { SuccessResponse } from '../models/responses/SuccessResponse'
import { PingHelper } from '../helpers/PingHelper'
import { bodyValidator } from './middlewares/PingMiddlewares'
import { SampleRequest } from '../models/requests/SampleRequest'

const helper = new PingHelper()

@Controller('ping')
export class PingController {
  @Get(':id')
  async ping(req: Request, res: Response) {
    const id = req.params.id

    res.status(200).send(new SuccessResponse({ message: `Hello, ${id}` }))
  }

  @Post()
  @Middleware(bodyValidator)
  async pingWithBody(req: SampleRequest, res: Response) {
    const { id } = req.body

    const ans = await helper.getGreeting(id)

    res.status(200).send(new SuccessResponse({ message: ans }))
  }
}
