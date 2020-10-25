import { ITodo } from '../../mirage/fixtures/todos'
import { fetcher } from '../utils/swr'
import { mutate, cache } from 'swr'
import useMutation from 'use-mutation'
import { swrKeys } from '../constants/swrKeys'

export const createTodo = async (newTodo: ITodo): Promise<ITodo> => {
  const response = await fetcher(swrKeys.todos, {
    method: 'POST',
    body: JSON.stringify(newTodo),
  })

  if (!response.ok) throw new Error(response.statusText)

  return await response.json()
}

export const useCreateTodo = () => {
  return useMutation<ITodo>(createTodo, {
    onMutate({ input }) {
      const oldTodos = cache.get(swrKeys.todos)
      console.log('onMutate -> oldTodos', oldTodos)
      return () => mutate(swrKeys.todos, oldTodos, false) // rollback if it failed
    },

    onFailure({ error, rollback }) {
      if (error && rollback) rollback()
    },
  })
}
