import Card from 'react-bootstrap/Card'
import { Link, Navigate } from 'react-router-dom'
import styled from 'styled-components'

import { FormWithValidate } from '../../components/FormWithValidate'
import { Button, Input } from '../../ui'

import { FieldNames } from '../../helpers/validator'

import { useContext, useEffect, useState } from 'react'
import {
	IConfirmEmailCallback,
	fetchConfirmEmail,
} from '../../API/user/confirmEmail'
import {
	IRegistrationCallback,
	fetchDataForRegistration,
} from '../../API/user/register'
import { fetchRequestJWT } from '../../API/user/token/createJWT'
import { COLORS } from '../../constants/style/COLORS'
import { useNavigate  } from 'react-router-dom'
import { AuthContext } from '../../contexts'

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
		// setConfirm(true)
	}

	return (
		<>
			<Body>
			{authContext && <Navigate to={'/Profile'}/>}
				<Window>
					<FormWithValidate onSubmit={onSubmit}>
						<Window.Title>Окно регистрации</Window.Title>
						<Input
							defaultValue='Максим'
							name='first_name'
							placeholder='Имя'
							field={FieldNames.field}
						/>
						<Input
							defaultValue='Галушкин'
							name='last_name'
							placeholder='Фамилия'
							field={FieldNames.field}
						/>
						<Input
							defaultValue='maxi-q'
							name='username'
							placeholder='Логин'
							field={FieldNames.login}
						/>
						<Input
							defaultValue='maximkabust@gmail.com'
							name='email'
							placeholder='Почта'
							field={FieldNames.email}
						/>
						<Input
							defaultValue='evKBJHsdf4hriewiBSDIF777'
							name='password'
							type='password'
							placeholder='Пароль'
							field={FieldNames.password}
						/>
						<Input
							defaultValue='evKBJHsdf4hriewiBSDIF777'
							name='rePassword'
							type='password'
							placeholder='Повторить пароль'
							field={FieldNames.password}
						/>

						<RButton>Регистрация</RButton>
					</FormWithValidate>
					<Errors>
						{callback.password ? (
							<span>password: {...callback.password}</span>
						) : (
							<></>
						)}
						{callback.username ? (
							<span>username: {...callback.username}</span>
						) : (
							<></>
						)}
						{callback.non_field_errors ? (
							<span>{...callback.non_field_errors}</span>
						) : (
							<></>
						)}
					</Errors>
					<Link to='/Auth'>Уже зарегистрированы? Вход</Link>
				</Window>
			</Body>
		</>
	)
}

export const Authorization = ({ setLoggedIn }: { setLoggedIn: Function }) => {
	const [callback, setCallback] = useState<IRegistrationCallback>({})
	const navigate = useNavigate()
	const authContext = useContext(AuthContext)
	console.log('ads', authContext)
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
		// setConfirm(true)
	}

	return (
		<>
			<Body>
			{authContext && <Navigate to={'/Profile'}/>}
				<Window>
					<FormWithValidate onSubmit={onSubmit}>
						<Window.Title>Окно входа</Window.Title>
						<Input
							name='username'
							type='text'
							placeholder='Логин'
							field={FieldNames.field}
						/>
						<Input
							name='password'
							type='password'
							placeholder='Пароль'
							field={FieldNames.password}
						/>
						<RButton>Войти</RButton>
					</FormWithValidate>
					<Link to='/Registration'>Еще не зарегистрированы? Регистрация</Link>
				</Window>
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
				<Window>
					<FormWithValidate onSubmit={onSubmit}>
						<Window.Title>Подтвердите email</Window.Title>
						<Input
							name='confirmation_code'
							type='text'
							placeholder='Код'
							field={FieldNames.field}
						/>
						<RButton>Подтвердить</RButton>
					</FormWithValidate>
				</Window>
			</Body>
		</>
	)
}

const Errors = styled.div`
	color: red;
	display: flex;
	flex-direction: column;
`

const Body = styled.div`
	width: 100wh;
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${COLORS.blue100};
`

const Window = styled(Card)`
	min-width: 450px;
	min-height: 100px;
	width: max-content;
	height: min-content;
	padding: 40px;
	gap: 10px;
`
const RButton = styled(Button)`
	max-width: 150px;
	width: 100%;
	margin-left: auto;
`
