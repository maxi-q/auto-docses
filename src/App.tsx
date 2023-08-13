import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import styled from 'styled-components'

import { Footer, Header } from './modules'
import { Navigation } from './pages'

import './API/user/fetchDecorator'

import { IUser } from '@api/user/profileData'
import { fetchVerifyJWT } from '@api/user/token/verifyJWT'
import { AuthContext, DocumentContext, UserContext } from './contexts'

export function App() {
	const [background, setBackground] = useState('')
	const [loggedIn, setLoggedIn] = useState<Boolean>(false)
	const [user, setUser] = useState<IUser>({
		id: '',
		username: '',
		email: '',
		first_name: '',
		last_name: '',
		date_joined: '',
	})
	const [may, setMay] = useState(true)



	useEffect(() => {
		fetchVerifyJWT().then(data => {
			if (data.status != 400) {
				setLoggedIn(true)
			}
			setMay(true)
		})
	}, [])

	return (
		<AuthContext.Provider value={loggedIn}>
			<UserContext.Provider value={user}>
					<BrowserRouter>
						<Header />
						<MainStyled background={background}>
							{may && (
								<Navigation
									setLoggedIn={setLoggedIn}
									setUser={setUser}
								/>
							)}
						</MainStyled>
						<Footer />
					</BrowserRouter>
			</UserContext.Provider>
		</AuthContext.Provider>
	)
}

const DeveloperNav = styled('nav')`
	border-bottom: solid 1px;
	padding-bottom: 0.5rem;
	margin-bottom: 0px;
`
const MainStyled = styled.div<{ background: string }>`
	background-color: ${props => props.background};
	padding-top: 62px;
	
`
