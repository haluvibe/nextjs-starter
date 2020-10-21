export interface ITodo {
  text: string
  isDone: boolean
}

export const todosMirageFixture: ITodo[] = [
  { text: 'Buy groceries', isDone: false },
  { text: 'Walk the dog', isDone: false },
  { text: 'Go for a swim', isDone: false },
]
