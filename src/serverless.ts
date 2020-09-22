import StartServer from './StartServer'
import serverless from 'serverless-http'

const server = new StartServer()
module.exports.handler = serverless(server.getApp())
