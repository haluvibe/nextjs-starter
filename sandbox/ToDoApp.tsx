import React from 'react'
import useSWR from 'swr'
import { Button, ButtonTypes } from '../presentational/elements/button/Button'
import { fetcher } from '../utils/swr'

// const getTodo = async (id: number) => {
//   const response = await fetch(`${todosEndpoint}/${id}`)
//   return await response.json()
// }
// const updateTodo = async (id: number, todo: Todo) => {
//   const response = await fetch(`${todosEndpoint}/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//     body: JSON.stringify(todo),
//   })
//   return await response.json()
// }

const deleteTodo = async (id: number) => {
  const response = await fetch(`api/todos/delete/${id}`)
  return await response.json()
}

export const TodoApp = () => {
  const { data } = useSWR('todos', fetcher)

  console.log('TodoApp -> todos', data?.todos)

  if (!data) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {data.todos.map((todo) => (
        <div key={todo.id}>
          <Button
            type={ButtonTypes.default}
            label={todo.text}
            handleClick={() => deleteTodo(todo.id)}
          />
        </div>
      ))}
    </div>
  )
}
