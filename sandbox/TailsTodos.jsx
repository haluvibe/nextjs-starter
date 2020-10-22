import React, { useEffect, useState, useRef } from 'react'
import useSWR from 'swr'
import { useIsMounted } from '../src/hooks/useIsMounted'
import { useRequestManager } from '../src/hooks/useRequestManager'
import { fetcher } from '../src/utils/swr'

let tempIdCounter = 1

export const TailsTodos = () => {
  const manager = useRequestManager()
  const isMounted = useIsMounted()
  const [newTodoRef, setNewTodoRef] = useRefState({ text: '', isDone: false })

  const isSaving = manager.hasPendingRequests

  async function createTodo(event) {
    event.preventDefault()
    const newTodo = { ...newTodoRef.current }
    const tempId = `t${tempIdCounter}`
    tempIdCounter++
    const localNewTodo = { ...newTodo, ...{ id: tempId } }

    // Optimistic UI update
    updateTodosCache({ todos: [...todos, localNewTodo] }, false)

    // Resetting the new todo textbox
    setNewTodoRef({ text: '', isDone: false })

    // Create the todo
    const request = manager.create()
    const newTodoJson = await fetcher('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ todo: newTodo }),
    })

    if (isMounted.current) {
      request.done()
    }

    // Update client side cache with record from server
    updateTodosCache(async (cache) => {
      const changedIndex = cache.todos.findIndex((todo) => todo.id === tempId)

      return {
        todos: cache.todos.map((oldTodo, i) =>
          i === changedIndex ? { ...oldTodo, id: newTodoJson.todo.id } : oldTodo
        ),
      }
    }, false)
  }

  async function saveTodo(todo) {
    // Optimistic UI update
    const changedIndex = todos.findIndex((t) => t.id === todo.id)
    updateTodosCache(
      {
        todos: todos.map((oldTodo, i) => (i === changedIndex ? todo : oldTodo)),
      },
      false
    )

    // Save the updated todo
    const request = manager.create()
    await fetcher(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ todo }),
    })
    if (isMounted.current) {
      request.done()
    }
  }

  async function deleteCompleted() {
    const request = manager.create()
    const completedTodos = todos.filter((t) => t.isDone)
    const remainingTodos = todos.filter((t) => !t.isDone)

    // Optimistic UI update
    updateTodosCache({ todos: remainingTodos }, false)

    // Delete all completed todos
    await Promise.all(
      completedTodos.map((todo) => fetcher(`/api/todos/${todo.id}`, { method: 'DELETE' }))
    )

    if (isMounted.current) {
      request.done()
    }
  }

  function handleChange(event) {
    setNewTodoRef({ ...newTodoRef.current, ...{ text: event.target.value } })
  }

  const { data, mutate: updateTodosCache } = useSWR('/api/todos')

  const todos = data?.todos
  console.log('todos', todos)
  const done = todos?.filter((todo) => todo.isDone).length

  return (
    <div className="max-w-sm px-4 py-6 mx-auto bg-white rounded shadow-lg">
      <div className="flex items-center justify-between px-3">
        <h1 className="text-2xl font-bold">Todos</h1>

        <div className="text-blue-500">
          {isSaving && (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" data-testid="saving">
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1z" />
            </svg>
          )}
        </div>
      </div>

      <div className="mt-6">
        {!todos ? (
          <p className="px-3 text-gray-500" data-testid="loading">
            Loading...
          </p>
        ) : (
          <div>
            <div className="px-3">
              <form onSubmit={createTodo} data-testid="new-todo-form">
                <input
                  type="text"
                  value={newTodoRef.current.text}
                  onChange={handleChange}
                  placeholder="New todo"
                  className="block w-full px-3 py-2 placeholder-gray-500 bg-white rounded shadow focus:outline-none"
                />
              </form>
            </div>

            {data.todos.length > 0 ? (
              <ul className="mt-8">
                {data.todos.map((todo) => (
                  <Todo todo={todo} onChange={saveTodo} key={todo.id} />
                ))}
              </ul>
            ) : (
              <p className="px-3 mt-16 text-lg text-center text-gray-500" data-testid="no-todos">
                Everything`s done!
              </p>
            )}

            <div className="flex justify-between px-3 mt-12 text-sm font-medium text-gray-500">
              {todos.length > 0 ? (
                <p data-testid="completed-todos">
                  {done} / {todos.length} complete
                </p>
              ) : null}
              {done > 0 ? (
                <button
                  onClick={deleteCompleted}
                  className="font-medium text-blue-500 focus:outline-none focus:text-blue-300"
                  data-testid="clear-completed"
                >
                  Clear completed
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function useRefState(initialState) {
  const [state, setState] = useState(initialState)
  const ref = useRef(state)

  function updateRefAndSetState(newState) {
    ref.current = newState
    setState(newState)
  }

  return [ref, updateRefAndSetState]
}

function Todo({ todo, onChange }) {
  const [isFocused, setIsFocused] = useState(false)
  const [localTodoRef, setLocalTodo] = useRefState({ ...todo })

  function handleChange(event) {
    setLocalTodo({ ...localTodoRef.current, ...{ text: event.target.value } })
  }

  function handleCheck(event) {
    setLocalTodo({
      ...localTodoRef.current,
      ...{ isDone: event.target.checked },
    })

    commitChanges()
  }

  function handleSubmit(event) {
    event.preventDefault()
    commitChanges(localTodoRef.current)
  }

  function commitChanges() {
    setIsFocused(false)

    const hasChanges =
      localTodoRef.current.text !== todo.text || localTodoRef.current.isDone !== todo.isDone

    if (hasChanges) {
      onChange(localTodoRef.current)
    }
  }

  return (
    <li
      className={`
        my-1 rounded focus:bg-white border-2 flex items-center relative
        ${isFocused ? 'bg-white border-gray-300' : ''}
        ${!isFocused ? 'border-transparent hover:bg-gray-200' : ''}
        ${!isFocused && localTodoRef.current.isDone ? 'opacity-50' : ''}
      `}
      data-testid="todo"
      data-todoid={localTodoRef.current.id}
    >
      <input
        type="checkbox"
        checked={localTodoRef.current.isDone}
        onChange={handleCheck}
        className="ml-2"
      />

      <form onSubmit={handleSubmit} className="relative w-full">
        <input
          type="text"
          value={localTodoRef.current.text}
          onChange={handleChange}
          placeholder="New Todo"
          onFocus={() => setIsFocused(true)}
          onBlur={commitChanges}
          className={`
            bg-transparent focus:outline-none px-3 py-1 block w-full
            ${localTodoRef.current.isDone && !isFocused ? 'line-through' : ''}
          `}
        />
      </form>
    </li>
  )
}
