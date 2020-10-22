# Project thoughts

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

## Styleguide Driven Development tool

https://storybook.js.org/

## sandbox folder
A sandbox where anything can live, please do delete stale files & folders

## src File/Folder structure

Please read and understand this article before working with this repository:
https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

Presentational components should be developed using storybook, not Nextjs.

container
 - uses useReducer for complex state 
 - use SWR for data
 - use useState for simple state
 - no css or html!!!

container/providers
 - globally scoped provider context hooks & components live here
 - less is better, ideally scope context hooks & components to the view

container/mutations
 - SWR create, opdate and delete operations live here

container/queries
 - SWR read operations live here

 container/views
 - view scoped context hooks & components live here

hooks
 - global utility hooks live here

pages
 - browser routes live here
 - except for _app.tsx and _document.tsx, page files should simply load views and be as minimal as possible
 - see https://nextjs.org/docs/basic-features/pages

pages/api
 - api routes live here
 - https://nextjs.org/docs/api-routes/introduction 

 presentational
  - Presentational components live here
  - Use useState for simple state
  - Use useReducer for complex state
  - functional components only
  - exposes the minimum number of props possible
  - must not use SWR for any reason

presentational/elements
 - the smallest components that can live on it's own
 - Can import materials but not other elements

presentational/blocks
 - Blocks can contain multiple elements or other blocks

presentational/foundation
 - colors, typography, grid, spacers, presentational config files etc live here

presentational/prototypes
 - View prototypes without logic live here