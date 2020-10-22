import { Model } from 'miragejs'
import { ITodo, todosMirageFixture } from '../mirage/fixtures/todos'
import { todosMirageRoutes } from '../mirage/routes/todos'

export type TEnvironment = 'development' | 'staging' | 'production'

export interface IMirageServerConfig {
  environment: TEnvironment
  models: {
    [key: string]: typeof Model
  }
  fixtures: {
    [key: string]: ITodo[]
  }
  routes: () => void
}

export const mirageServerConfig: IMirageServerConfig = {
  environment: 'development',

  models: {
    todo: Model,
  },

  fixtures: {
    todos: todosMirageFixture,
  },

  routes() {
    this.namespace = 'api'
    this.timing = 750
    todosMirageRoutes(this)
    // workaround for a bug caused by next.js 9.5.5 update
    this.passthrough((request) => {
      if (request.url === '/_next/static/development/_devPagesManifest.json') {
        return true
      }
    })
  },
}
