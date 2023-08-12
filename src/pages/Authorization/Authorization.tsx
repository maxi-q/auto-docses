import { Navigate } from 'react-router-dom'

import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	IConfirmEmailCallback,
	fetchConfirmEmail,
} from '../../API/user/confirmEmail'
import {
	IRegistrationCallback,
	fetchDataForRegistration,
} from '../../API/user/register'
import { fetchRequestJWT } from '../../API/user/token/createJWT'
import { AuthContext } from '../../contexts'
import { AuthWindow, EmailWindow, RegWindow } from './modules'
import { Body } from './ui'

type NavigationType = {
	setLoggedIn: Function
}

export const Registration = ({ setLoggedIn }: NavigationType) => {
	const [confirm, setConfirm] = useState(false)
	const [username, setUsername] = useState('')

	return confirm ? (
		<EmailConfirm setLoggedIn={setLoggedIn} username={username}></EmailConfirm>
	) : (
		<Main setUsername={setUsername} setConfirm={setConfirm}></Main>
	)
}

const Main = ({
	setConfirm,
	setUsername,
}: {
	setConfirm: Function
	setUsername: Function
}) => {
	const [callback, setCallback] = useState<IRegistrationCallback>({})
	const authContext = useContext(AuthContext)

	useEffect(() => {
		if (callback.status == 201) {
			setUsername(callback.regUsername)
			setConfirm(true)
		}
	}, [callback])

	const onSubmit = async (data: Object) => {
		if (
			'username' in data &&
			'password' in data &&
			'first_name' in data &&
			'last_name' in data &&
			'email' in data
		) {
			fetchDataForRegistration({
				username: typeof data.username == 'string' ? data.username : '',
				password: typeof data.password == 'string' ? data.password : '',
				first_name: typeof data.first_name == 'string' ? data.first_name : '',
				last_name: typeof data.last_name == 'string' ? data.last_name : '',
				email: typeof data.email == 'string' ? data.email : '',
			}).then(feedback => setCallback(feedback))
		}
	}

	return (
		<>
			<Body>
				{authContext && <Navigate to={'/Profile'} />}
				<RegWindow onSubmit={onSubmit} callback={callback} />
			</Body>
		</>
	)
}

export const EmailConfirm = ({
	username,
	setLoggedIn,
}: {
	username: string
	setLoggedIn: Function
}) => {
	const [callback, setCallback] = useState<IConfirmEmailCallback>({})

	const navigate = useNavigate()

	useEffect(() => {
		if (callback.status == 200) {
			navigate('/Profile')
			setLoggedIn(true)
			console.log(callback)
		}
	}, [callback])

	const onSubmit = async (data: Object) => {
		if ('confirmation_code' in data) {
			fetchConfirmEmail({
				username: username,
				confirmation_code:
					typeof data.confirmation_code == 'string'
						? data.confirmation_code
						: '',
			}).then(feedback => setCallback(feedback))
		}
	}

	return (
		<>
			<Body>
				<EmailWindow onSubmit={onSubmit} />
			</Body>
		</>
	)
}

export const Authorization = ({ setLoggedIn }: { setLoggedIn: Function }) => {
	const [callback, setCallback] = useState<IRegistrationCallback>({})
	const authContext = useContext(AuthContext)

	const navigate = useNavigate()

	useEffect(() => {
		if (callback.status == 200) {
			setLoggedIn(true)
			navigate('/Profile')
		}
	}, [callback])

	const onSubmit = async (data: Object) => {
		console.log('hello, ', data)
		if ('username' in data && 'password' in data) {
			fetchRequestJWT({
				username: typeof data.username == 'string' ? data.username : '',
				password: typeof data.password == 'string' ? data.password : '',
			}).then(feedback => setCallback(feedback))
		}
	}

	return (
		<>
			<Body>
				{authContext && <Navigate to={'/Profile'} />}
				<AuthWindow onSubmit={onSubmit} />
			</Body>
		</>
	)
}
