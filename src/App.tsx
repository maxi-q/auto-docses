import { useEffect, useState } from 'react'
import { Stack } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import styled from 'styled-components'

import { Footer, Header } from './modules'
import { Navigation } from './pages'

import './API/user/fetchDecorator'

import { IUser, fetchRequestProfile } from '@api/user/profileData'
import { AuthContext, UserContext } from './contexts'

export function App() {
	const [loggedIn, setLoggedIn] = useState<Boolean>(false)
	const [user, setUser] = useState<IUser | undefined>()

	const logOut = () => {
		setLoggedIn(false)
		localStorage.setItem('access', '')
	}

	useEffect(() => {
		const token = localStorage.getItem('access')

		if (token) {
			fetchRequestProfile()
				.then(data => {
					if (data.status == 401) {
						localStorage.setItem('access', '')
						setLoggedIn(false)
						throw new Error('Unauthorized')
					}
					setUser(data)
				})
				.catch(_ => {
					setLoggedIn(false)
				})
		} else {
			setLoggedIn(false)
		}
	}, [])

	return (
		<Stack style={{ minHeight: '100vh' }}>
			<AuthContext.Provider value={loggedIn}>
				<UserContext.Provider value={user}>
					<BrowserRouter>
						<Header logOut={logOut} />
						<MainStyled>
							<Navigation setLoggedIn={setLoggedIn} setUser={setUser} />
						</MainStyled>
						<Footer />
					</BrowserRouter>
				</UserContext.Provider>
			</AuthContext.Provider>
		</Stack>
	)
}

const MainStyled = styled.div`
	& > * {
		padding-top: 62px;
	};
	flex: 1;
`
