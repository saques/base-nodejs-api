import * as bodyParser from 'body-parser'
import * as controllers from './controllers'
import { Response, Request } from 'express'
import logger, { expressMiddleware as loggingMiddleware } from './utils/middlewares/logger'
import { Server } from '@overnightjs/core'
import { Application } from 'serverless-http'
import { jsonParser } from './utils/middlewares/jsonParser'
import { ResponseError, ErrorCodeType } from './models/responses/ResponseError'
import { errorHandler } from './utils/middlewares/errorHandler'
import { requestLogger } from './utils/middlewares/requestLogger'

// This wraps all functions to handle errors on async endpoints
require('express-async-errors')

function default404(req: Request, res: Response) {
  res
    .status(404)
    .send(
      new ResponseError(
        `Method ${req.method} at ${req.path} is not supported`,
        ErrorCodeType.InvalidPath
      )
    )
}

class StartServer extends Server {
  private readonly SERVER_STARTED = 'Server started on port: '

  constructor() {
    super(false)
    this.app.use(jsonParser())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(loggingMiddleware())
    this.setupControllers()
    this.app.use(default404)
    this.app.use(errorHandler)
  }

  private setupControllers(): void {
    const ctlrInstances = []
    for (const name in controllers) {
      if (controllers.hasOwnProperty(name)) {
        const controller = (controllers as any)[name]
        ctlrInstances.push(new controller())
      }
    }
    super.addControllers(ctlrInstances, undefined, requestLogger)
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      logger.info(this.SERVER_STARTED + port)
    })
  }

  public getApp(): Application {
    return this.app
  }
}

export default StartServer
