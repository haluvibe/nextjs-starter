import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import useSWR from 'swr'
import { useIsMountedRef } from '../src/hooks/useIsMountedRef'
import { useRequestManager } from '../src/hooks/useRequestManager'
import { swrKeys } from '../src/constants/swrKeys'
import { updateTodo } from '../src/mutations/updateTodo'
import { useRefState } from '../src/hooks/useRefState'
import { deleteCompletedTodos } from '../src/mutations/deleteCompletedTodos'
import { ITodo } from '../mirage/fixtures/todos'
import { createTodo } from '../src/mutations/createTodo'

export const TailsTodos = () => {
  const { data: todos } = useSWR<ITodo[]>(swrKeys.todos)

  const manager = useRequestManager()
  const isSaving = manager.hasPendingRequests
  const isMountedRef = useIsMountedRef()
  const { ref: newTodoRef, updateRefAndSetState: setNewTodoRef } = useRefState<Partial<ITodo>>({
    text: '',
    isDone: false,
  })

  async function handleSubmit(event: SyntheticEvent<EventTarget>) {
    event.preventDefault()
    const newTodo = { ...newTodoRef.current }
    // Resetting the new todo textbox
    setNewTodoRef({ text: '', isDone: false })
    const request = manager.create()
    createTodo(newTodo)
    if (isMountedRef.current) {
      request.done()
    }
  }

  async function handleClick() {
    const request = manager.create()

    deleteCompletedTodos()

    if (isMountedRef.current) {
      request.done()
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTodoRef({ ...newTodoRef.current, ...{ text: event.target.value } })
  }

  async function saveTodo(todo: ITodo) {
    const request = manager.create()

    await updateTodo(todo)

    if (isMountedRef.current) {
      request.done()
    }
  }

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
              <form onSubmit={handleSubmit} data-testid="new-todo-form">
                <input
                  type="text"
                  value={newTodoRef.current.text}
                  onChange={handleChange}
                  placeholder="New todo"
                  className="block w-full px-3 py-2 placeholder-gray-500 bg-white rounded shadow focus:outline-none"
                />
              </form>
            </div>

            {todos.length > 0 ? (
              <ul className="mt-8">
                {todos.map((todo) => {
                  return <Todo todo={todo} saveTodo={saveTodo} key={todo.id} />
                })}
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
                  onClick={handleClick}
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

function Todo({ todo, saveTodo }: { todo: ITodo; saveTodo: (todo: ITodo) => Promise<void> }) {
  const [isFocused, setIsFocused] = useState(false)
  const { ref: localTodoRef, updateRefAndSetState: setLocalTodo } = useRefState({ ...todo })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setLocalTodo({ ...localTodoRef.current, ...{ text: event.target.value } })
  }

  function handleCheck(event: ChangeEvent<HTMLInputElement>) {
    setLocalTodo({
      ...localTodoRef.current,
      ...{ isDone: event.target.checked },
    })

    commitChanges()
  }

  function handleSubmit(event) {
    event.preventDefault()
    commitChanges()
  }

  function commitChanges() {
    setIsFocused(false)

    const hasChanges =
      localTodoRef.current.text !== todo.text || localTodoRef.current.isDone !== todo.isDone

    if (hasChanges) {
      saveTodo(localTodoRef.current)
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
