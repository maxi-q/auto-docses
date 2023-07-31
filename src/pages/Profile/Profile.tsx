import { useContext, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components'
import { fetchRequestProfile } from '../../API/user/profileData'
import { COLORS } from '../../constants/style/COLORS'
import { AuthContext, UserContext } from '../../contexts'
import { getFullDate } from '../../helpers/date'
import { Button } from '../../ui'
import { Navigate } from 'react-router-dom'

type NavigationType = {
	setUser: Function
	setLoggedIn: Function
}

export const Profile = ({ setUser, setLoggedIn }: NavigationType) => {
	const authContext = useContext(AuthContext)
	const userContext = useContext(UserContext)

	useEffect(() => {
		fetchRequestProfile()
			.then(data => {
				data.date_joined = getFullDate(new Date(data.date_joined))
				setUser(data)
			})
			.catch(error => {
				setLoggedIn(false)
				localStorage.setItem('access', '')
			})
	}, [])

	const logOut = () => {
		setLoggedIn(false)
		localStorage.setItem('access', '')
	}
	return (
		<Body>
			<Main>
				{!authContext && <Navigate to={'/Auth'}/>}
				<p>
					<Title> Hello, {userContext.username} </Title>
					{userContext.first_name} {userContext.last_name}
					<br />
					{userContext.email}
					<br />
					<Text>Зарегистрирован:</Text> {userContext.date_joined}
				</p>
				<Button onClick={logOut}>Выйти</Button>
			</Main>
		</Body>
	)
}

const Text = styled.span`
	font-weight: 100;
`
const Main = styled.div`
	padding: 15px;
	width: 40%;
	height: 90vh;
	background-color: ${COLORS.blue100};
`
const MTable = styled(Table)`
	height: min-content;
	background-color: ${COLORS.blue100};
	border-radius: 5px;
	margin: 1% 5% 0 0;
`
const Body = styled.div`
	background-color: transparent;
	min-height: 500px;
	display: flex;
	width: 100%;
	margin-right: auto;
	margin-left: auto;
`
const TableBlock = styled.div`
	background-color: transparent;
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-right: auto;
	margin-left: auto;
	padding-top: 1%;
`
const Title = styled.h3``

{
	/* <Aside />
			<TableBlock>
				<Title>Документы</Title>
				<MTable striped>
					<thead>
						<tr>
							<th>Имя</th>
							<th>Дата изменения</th>
						</tr>
					</thead>
					<tbody>
						<Rows />
					</tbody>
				</MTable>
			</TableBlock> */
}
