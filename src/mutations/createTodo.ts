import { cache, mutate } from 'swr'
import { ITodo } from '../../mirage/fixtures/todos'
import { swrKeys } from '../constants/swrKeys'

let tempIdCounter = 1

export const createTodo = async (newTodo: Partial<ITodo>) => {
  const todos = cache.get(swrKeys.todos)

  // Optimistic UI update
  const tempId = `t${tempIdCounter}`
  tempIdCounter++
  const localNewTodo = { ...newTodo, id: tempId }
  mutate(swrKeys.todos, (todos) => [...todos, localNewTodo], false)

  // Create the todo
  const response = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(newTodo),
  })

  // rollback in the event of any errors
  if (!response.ok) {
    mutate(swrKeys.todos, todos, true)
    // throw new Error(response.statusText)
    return
  }

  // Update client side cache with record from server
  const serverNewTodo = await response.json()
  mutate(
    swrKeys.todos,
    (todos) => {
      const changedIndex = todos.findIndex((todo) => todo.id === tempId)

      return todos.map((oldTodo, index) => (index === changedIndex ? serverNewTodo : oldTodo))
    },
    false
  )
}
