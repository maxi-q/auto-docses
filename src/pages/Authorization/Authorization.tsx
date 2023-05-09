import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { FormWithValidate } from '../../components/FormWithValidate'
import { Button, Input } from '../../ui'

import { FieldNames } from '../../helpers/validator'
import { LotsSelect } from '../../ui/Form/Selects/LotsSelect'
import { Select } from '../../ui/Form/Selects/Select'

export const Registration = () => {
	const onSubmit = (data: object) => console.log(data)

	return (
		<>
			<Body>
				<Window>
					<FormWithValidate onSubmit={onSubmit}>
						<Window.Title>Окно регистрации</Window.Title>
						<Input name='login' placeholder='Логин' field={FieldNames.login} />
						<Input name='email' placeholder='Почта' field={FieldNames.email} />
						<Input
							name='password'
							type='password'
							placeholder='Пароль'
							field={FieldNames.password}
						/>
						<Input
							name='rePassword'
							type='password'
							placeholder='Повторить пароль'
							field={FieldNames.password}
						/>
						<Input
							field={FieldNames.field}
							name='About'
							type='textarea'
							placeholder='textarea'
						/>
						<Input field={FieldNames.field} name='date' type='date' placeholder='date' />

						<RButton>Регистрация</RButton>
					</FormWithValidate>
					<Link to='/Auth'>Уже зарегистрированы? Вход</Link>
				</Window>
			</Body>
		</>
	)
}

export const Authorization = () => {
	const onSubmit = (data: object) => console.log(data)

	return (
		<>
			<Body>
				<Window>
					<FormWithValidate onSubmit={onSubmit}>
						<Window.Title>Окно авторизации</Window.Title>
						<Input name='login' type='text' placeholder='Логин' field={FieldNames.field} />
						<Input
							name='password'
							type='password'
							placeholder='Пароль'
							field={FieldNames.password}
						/>
						<Select
							name='selectPassword'
							placeholder='Пароль'
							field={FieldNames.select}
							options={[{ label: 1, value: '123' }]}
						/>
						<LotsSelect
							name='LotsSelectPassword'
							placeholder='Пароль'
							field={FieldNames.select}
							options={[{ label: 1, value: '123' }]}
						/>
						<RButton>Авторизация</RButton>
					</FormWithValidate>
					<Link to='/Reg'>Еще не зарегистрированы? Регистрация</Link>
				</Window>
			</Body>
		</>
	)
}

const Body = styled.div`
	width: 100wh;
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
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
	width: 150px;
	margin-left: auto;
`
