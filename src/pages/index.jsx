import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Main } from './Main'
import { LoadPage } from './LoadPage'

export const Navigation = () => {
  return (
    <Routes>
      <Route path="/Home" element={<Main/>}/>
      <Route path="/LoadPage" element={<LoadPage/>}/>
    </Routes>
  )
}



// export const routesMap = [
// { path: '/accesso/done', route: routes.accesso.done },
// { path: '/card/new', route: routes.card.create },
// { path: '/card/:cardId/edit', route: routes.card.edit },
// { path: '/card/:cardId', route: routes.card.view },
// { path: '/', route: routes.home },
// { path: '/search', route: routes.search.results },
// { path: '/test/comments', route: routes.test.comments },
// { path: '/u/:username', route: routes.user.view },
// ];

// export const notFoundRoute = routes.errors.notFound;