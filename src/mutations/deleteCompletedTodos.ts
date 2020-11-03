import { cache, mutate } from 'swr'
import { swrKeys } from '../constants/swrKeys'

export const deleteCompletedTodos = async () => {
  const todos = cache.get(swrKeys.todos)

  // Optimistic UI update
  const completedTodos = todos.filter((todo) => todo.isDone)
  const remainingTodos = todos.filter((todo) => !todo.isDone)
  mutate(swrKeys.todos, remainingTodos, false)

  // Delete all completed todos
  const results = await Promise.all<Response>(
    completedTodos.map((todo) => fetch(`/api/todos/${todo.id}`, { method: 'DELETE' }))
  )

  // rollback in the event of any errors
  const invalidResults = results.filter((result) => !result.ok)

  if (invalidResults.length > 0) {
    mutate(swrKeys.todos, todos, true)
    // throw new Error(response.statusText)
  }
}
