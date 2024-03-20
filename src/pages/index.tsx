import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'

import { Authorization, Registration } from './Authorization'
import { LoadPage } from './LoadPage'
import ViewDocument from './LoadPage/ViewDocument'
import { Main } from './Main'
import { Profile } from './Profile'
import { RecordsPage } from './Records'

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
			<Route path='LoadPage' element={<LoadPage {...props} />}>
				<Route path=':id' element={<Navigate to={'0'} />} />
				<Route path=':id/:index' element={<LoadPage {...props} />} />
				<Route path='*' element={<Navigate to={'/Profile'} />} />
			</Route>
			<Route path='View' element={<ViewDocument {...props} />}>
				<Route path=':id' element={<ViewDocument {...props} />} />
			</Route>
			<Route path='Profile' element={<Profile {...props} />} />
			<Route path='Records' element={<RecordsPage {...props} />} />

			<Route path='*' element={<Navigate to={'/Profile'} />} />
		</Routes>
	)
}
