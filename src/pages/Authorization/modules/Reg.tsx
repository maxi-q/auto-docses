import { Input } from '@ui/index'
import { Errors, RButton, Window } from '../ui'
import { FieldNames } from '@helpers/validator'
import { FormWithValidate } from '@components/FormWithValidate'
import { Link } from 'react-router-dom'
import { IRegistrationCallback } from '@api/user/register'
import { SubmitHandler } from 'react-hook-form'

interface IRegWindow {
	onSubmit: SubmitHandler<Object>
	callback: IRegistrationCallback
}

export const RegWindow = ({onSubmit, callback}: IRegWindow) => {
	return (
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
	)
}
