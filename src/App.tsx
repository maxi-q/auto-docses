import { useEffect, useState } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Footer, Header } from './modules'
import { Navigation } from './pages'

import './API/user/fetchDecorator'

import { IUser, fetchRequestProfile } from '@api/user/profileData'
import { AuthContext, UserContext } from './contexts'
import { getFullDate } from '@helpers/date'

export function App() {
	const [background, setBackground] = useState('')
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
					console.log(data)
					if (data.status == 401) {
						localStorage.setItem('access', '')
						setLoggedIn(false)
						throw new Error('Unauthorized')
					}
					data.date_joined = getFullDate(data.date_joined)
					setUser(data)
				})
		}else {
			setLoggedIn(false)
		}
	}, [])
	return (
		<AuthContext.Provider value={loggedIn}>
			<UserContext.Provider value={user}>
				<BrowserRouter>
					<Header logOut={logOut} />
					<MainStyled background={background}>
						<Navigation setLoggedIn={setLoggedIn} setUser={setUser} />
					</MainStyled>
					<Footer />
				</BrowserRouter>
			</UserContext.Provider>
		</AuthContext.Provider>
	)
}

const MainStyled = styled.div<{ background: string }>`
	background-color: ${props => props.background};
	& > * {
		padding-top: 62px;
	}
`
