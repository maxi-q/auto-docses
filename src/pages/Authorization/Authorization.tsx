import { Navigate } from 'react-router-dom'

import { fetchVerifyJWT } from '@api/user/token/verifyJWT'
import { ServerSetError } from '@helpers/ServerSetError'
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
	const [serverError, setServerError] = useState<
		Array<{ key: string; errors: Array<string> }>
	>([])

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
			'rePassword' in data &&
			'email' in data
		) {
			if (data.rePassword != data.password) {
				setServerError([{ key: 'пароль', errors: ['пароли не совпадают'] }])
				return
			}
			fetchDataForRegistration({
				username: typeof data.username == 'string' ? data.username : '',
				password: typeof data.password == 'string' ? data.password : '',
				email: typeof data.email == 'string' ? data.email : '',
			}).then(res => {
				if (res.status == 201) {
					const username = localStorage.getItem('username')
					setUsername(username)
					setConfirm(true)
				} else {
					res.json().then(err => {
						setServerError(ServerSetError(err))
					})
				}
			})
		}
	}

	return (
		<>
			<Body>
				{authContext && <Navigate to={'/Profile'} />}
				<RegWindow onSubmit={onSubmit} serverError={serverError} />
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
	const [serverError, setServerError] = useState<
		Array<{ key: string; errors: Array<string> }>
	>([])

	const navigate = useNavigate()

	const onSubmit = async (data: Object) => {
		if ('confirmation_code' in data) {
			fetchConfirmEmail({
				username: username,
				confirmation_code:
					typeof data.confirmation_code == 'string'
						? data.confirmation_code
						: '',
			}).then(res => {
				if (res.status == 200) {
					const password = localStorage.getItem('password')
					fetchRequestJWT({ username: username, password: password }).then(
						res => {
							res.json().then(data => {
								localStorage.setItem('access', data.access)
								setLoggedIn(true)
								navigate('/Profile')
							})
						}
					)
				} else {
					res.json().then(err => {
						setServerError(ServerSetError(err))
					})
				}
			})
		}
	}

	return (
		<>
			<Body>
				<EmailWindow serverError={serverError} onSubmit={onSubmit} />
			</Body>
		</>
	)
}

export const Authorization = ({ setLoggedIn }: { setLoggedIn: Function }) => {
	const [serverError, setServerError] = useState<
		Array<{ key: string; errors: Array<string> }>
	>([])

	const navigate = useNavigate()

	useEffect(() => {
		fetchVerifyJWT().then(res => {
			if (res.status == 200) {
				setLoggedIn(true)
				navigate(-1)
			}
		})
	}, [])

	const onSubmit = async (data: Object) => {
		console.log(data)
		if ('username' in data && 'password' in data) {
			fetchRequestJWT({
				username: typeof data.username == 'string' ? data.username : '',
				password: typeof data.password == 'string' ? data.password : '',
			}).then(res => {
				if (res.status == 200) {
					res.json().then(d => localStorage.setItem('access', d.access))
					setLoggedIn(true)
					navigate('/Profile')
				} else {
					res.json().then(err => {
						setServerError(ServerSetError(err))
					})
				}
			}).catch((err) => {
				throw new Error(err)
			})
		}
	}

	return (
		<>
			<Body>
				<AuthWindow serverError={serverError} onSubmit={onSubmit} />
			</Body>
		</>
	)
}
