import React from 'react'
import { TodoApp } from '../../sandbox/ToDoApp'

type Props = {
  name: string
}

const TodoPage: React.FunctionComponent<Props> = () => (
  <div>
    <TodoApp />
  </div>
)
export default TodoPage
