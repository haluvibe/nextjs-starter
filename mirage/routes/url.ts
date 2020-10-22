// @ts-nocheck
import { Server } from 'miragejs'

export const urlMirageRoutes = (server: Server): void => {
  server.get('/url/:id', (schema, request) => {
    return {
      url: 'mirage' + request.params.id,
    }
  })
}
