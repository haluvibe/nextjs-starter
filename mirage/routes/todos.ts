// @ts-nocheck
import { Server } from 'miragejs'

export const todosMirageRoutes = (server: Server): void => {
  server.get('/todos', (schema) => {
    return schema.todos.all()
  })

  server.get('/todos/:id', (schema, request) => {
    return schema.todos.find(request.params.id)
  })

  server.delete('/todos/:id', (schema, request) => {
    return schema.todos.find(request.params.id).destroy()
  })

  server.patch('/todos/:id', (schema, request) => {
    const attrs = JSON.parse(request.requestBody).todo

    return schema.todos.find(request.params.id).update(attrs)
  })

  server.post(
    '/todos',
    (schema, request) => {
      const attrs = JSON.parse(request.requestBody).todo

      return schema.todos.create(attrs)
    },
    {}
  )
}
