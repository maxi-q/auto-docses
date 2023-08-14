import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'

import { Authorization, Registration } from './Authorization'
import { DocumentPage } from './DocumentPage'
import { LoadPage } from './LoadPage'
import { Main } from './Main'
import { Profile } from './Profile'
import {RecordsPage} from './Records'
import { fetchRequestProfile } from '@api/user/profileData'
import { getFullDate } from '@helpers/date'
import { useEffect } from 'react'

const GetParam = () => {
	const params = useParams()
	const prodId = params.id
	return <>{prodId}</>
}

type NavigationType = {
	setUser: Function
	setLoggedIn: Function
}

export const Navigation = (props: NavigationType) => {

	return (
		<Routes>
			<Route path='Auth' element={<Authorization {...props} />} />
			<Route path='Registration' element={<Registration {...props} />} />
			<Route path='Home' element={<Main />} />
			<Route path='LoadPage' element={<LoadPage {...props}/>}>
				<Route path=':id' element={<Navigate to={'0'} />} />
				<Route path=':id/:index' element={<LoadPage {...props}/>} />
				<Route path='*' element={<Navigate to={'/Profile'} />} />
			</Route>
			<Route path='Profile' element={<Profile {...props} />} />
			<Route path='Records' element={<RecordsPage {...props}/>} />

			<Route path='document' element={<DocumentPage />}>
				<Route path=':id' element={<GetParam />} />
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
