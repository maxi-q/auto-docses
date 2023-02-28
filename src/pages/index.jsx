import React from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import { Main } from './Main'
import { LoadPage } from './LoadPage'
import { Profile } from './Profile'
import { DocumentPage } from './DocumentPage'
import { Authorization, Registration } from './Authorization'

const GetParam = () => {
  const params = useParams();
    const prodId = params.id;
  return <>
  {prodId}
  </>
}
export const Navigation = (props) => {
  return (
    <Routes>
      <Route path="Auth" element={<Authorization {...props}/>}/>
      <Route path="Reg" element={<Registration {...props}/>}/>
      <Route path="Home" element={<Main {...props}/>}/>
      <Route path="LoadPage" element={<LoadPage {...props}/>}/>
      <Route path="Profile" element={<Profile {...props}/>}/>
      <Route path="document" element={<DocumentPage {...props}/>}>
        <Route path=":id" element={<GetParam/>}/>
      </Route>
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