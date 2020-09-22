import cls from 'cls-hooked'
import { createLogger, transports, format } from 'winston'
import { uuid } from './uuid'
import { Request, Response, NextFunction } from 'express'

const logger = createLogger({
  level: process.env.VERBOSITY || 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.printf((info) => {
      return buildLog(info, id())
    })
  ),
  transports: [new transports.Console()],
})

const buildLog = (info, requestId: string) => {
  const requestIdPart = requestId ? ` ${requestId}` : ''
  const utcTimestamp = new Date().toISOString()

  return `${utcTimestamp}${requestIdPart} ${info.level} ${info.message}`
}

export const turnOff = () => {
  logger.transports.forEach((transport) => {
    transport.silent = true
  })
}

// generate a unique value for namespace
const namespaceId = `tracer:${uuid()}`
const ns = cls.createNamespace(namespaceId)

export const expressMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    ns.bindEmitter(req)

    let requestId = uuid().slice(0, 8)

    res.set('X-Request-Id', requestId)

    ns.run(() => {
      ns.set('requestId', requestId)
      next()
    })
  }
}

const id = () => ns.get('requestId')

export default logger
