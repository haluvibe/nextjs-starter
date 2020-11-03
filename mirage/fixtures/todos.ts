export interface ITodo {
  text: string
  isDone: boolean
  id: string
}

export const todosMirageFixture: ITodo[] = [
  { text: 'Buy groceries', isDone: false, id: '1' },
  { text: 'Walk the dog', isDone: false, id: '2' },
  { text: 'Go for a swim', isDone: false, id: '3' },
]
