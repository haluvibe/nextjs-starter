# Project thoughts

## Questions

test

Supported browsers

## SWR
How to structure SWR...
```
import useSWR from 'swr'

import { getUser } from '@lib/authenticate'
import { API_USER } from '@lib/api-endpoints'

export default function useUser() {
  const swr = useSWR(API_USER, () => getUser())

  useEffect(() => {
    if (swr.data && !swr.data.user && redirect) {
      // redirect to login
      Router.replace(
        `/login`
      )
    }
  }, [swr.data])

  swr.isLoggedOut = swr.data && !swr.data.user
  swr.user = swr.data?.user

  return swr
}
```

## Rules for a lightning fast app - the goal is to follow the same rules as Vercel Dashboard
* Uses https://github.com/zeit/swr to ensure data is up-to-date while staying fast
* All pages are auto-exported to static HTML, no getInitialProps on any pages
* All pages implement a loading shell, an example of this is: https://vercel.com/dashboard/abcdefgh
* When a user opens the page a fetch is done against the API, if you're logged in they have a cookie set already, if not you're redirected to the login screen

see https://github.com/vercel/next.js/discussions/10724 for more info

## Supported Browsers

Latest versions of Chrome, Safari, Firefox and Edge on all devices

## Acceptable backend response time for basic CRUD operations

350 ms

This frontend does not handle issues caused by response times higher than this

## PWA

// TODO

## Mock servers

Frontend
https://miragejs.com/

// TODO 
Backend (used only for SSR)
MWS
https://mswjs.io/

## Component library

https://material-ui.com/

## SEO optimization
// TODO
Mastering nextjs course

## Styleguide Driven Development tool

https://storybook.js.org/

## sandbox folder
A sandbox where anything can live, please do delete stale files & folders

## Presentational components

Presentational components should be developed using storybook, not Nextjs. 

Presentational components:
  - never handle the loading of any data
  - are pure functional components.
  - Use useState for simple state
  - Use useReducer for complex state
  - exposes the minimum number of props possible
  - must not use SWR for any reason

## src File/Folder structure
constants
 - global constants and enums live here

hooks
 - global utility hooks live here

mutations
 - SWR create, opdate and delete operations live here

pages
 - browser routes live here
 - except for _app.tsx and _document.tsx, page files should simply load views and be as minimal as possible
 - see https://nextjs.org/docs/basic-features/pages

pages/api
 - api routes live here
 - https://nextjs.org/docs/api-routes/introduction 

presentational/elements
 - the smallest components that can live on it's own
 - Can import materials but not other elements

presentational/blocks
 - Blocks can contain multiple elements or other blocks

presentational/foundation
 - colors, typography, grid, spacers, presentational config files etc live here

presentational/prototypes
 - View prototypes without logic live here

providers
 - globally scoped provider context hooks & components live here
 - less is better, ideally scope context hooks & components to the view

queries
 - SWR read operations live here

utils
 - global utility functions live here

views
 - view scoped context hooks & components live here
