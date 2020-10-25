//@ts-nocheck
import { Server, Response } from 'miragejs'

export const todosMirageRoutes = (server: Server): void => {
  server.get('/todos', (schema) => {
    return schema.db.todos
  })

  server.get('/todos/:id', (schema, request) => {
    return schema.db.todos.find(request.params.id)
  })

  server.delete('/todos/:id', (schema, request) => {
    return schema.db.todos.find(request.params.id).destroy()
  })

  server.patch('/todos/:id', (schema, request) => {
    const attrs = JSON.parse(request.requestBody).todo
    return schema.db.todos.find(request.params.id).update(attrs)
    return new Response(400, { some: 'header' }, { errors: ['some error'] })
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
