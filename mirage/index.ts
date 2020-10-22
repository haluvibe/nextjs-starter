import { mirageServerConfig, TEnvironment } from './main.config'
import { Server } from 'miragejs'

export const startMirageServer = (environment?: TEnvironment): Server => {
  if (environment) {
    mirageServerConfig.environment = environment
  }

  const server = new Server(mirageServerConfig)

  return server
}
