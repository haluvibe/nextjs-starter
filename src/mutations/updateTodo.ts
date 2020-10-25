import { ITodo } from '../../mirage/fixtures/todos'
import { cache, mutate } from 'swr'
import { swrKeys } from '../constants/swrKeys'

export const updateTodo = async (todo: ITodo) => {
  const todos = cache.get(swrKeys.todos)
  console.log('todos', todos)
  // Optimistic UI update
  const changedIndex = todos.findIndex((t) => t.id === todo.id)

  mutate(
    swrKeys.todos,
    todos.map((oldTodo, i) => (i === changedIndex ? todo : oldTodo)),
    false
  )

  const response = await fetch(`/api/todos/${todo.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ todo }),
  })

  if (!response.ok) {
    console.log('test')
    mutate(swrKeys.todos, todos, true)
    // throw new Error(response.statusText)
  }
}
