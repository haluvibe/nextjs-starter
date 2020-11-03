import { Server } from 'miragejs'

export const todosMirageRoutes = (server: Server): void => {
  server.get('/todos', (schema) => {
    return schema.db.todos
  })

  server.patch('/todos/:id', (schema, request) => {
    const attrs = JSON.parse(request.requestBody)
    return schema.db.todos.update(request.params.id, attrs)
  })

  server.post(
    '/todos',
    (schema, request) => {
      const attrs = JSON.parse(request.requestBody)
      return schema.db.todos.insert(attrs)
      // return new Response(400, { some: 'header' }, { errors: ['some error'] })
    },
    {}
  )
}
