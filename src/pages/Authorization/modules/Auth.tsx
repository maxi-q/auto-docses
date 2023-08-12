import { FormWithValidate } from '@components/FormWithValidate'
import { FieldNames } from '@helpers/validator'
import { Input } from '@ui/index'
import { SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { RButton, Window } from '../ui'

interface IAuthWindow {
	onSubmit: SubmitHandler<Object>
}

export const AuthWindow = ({ onSubmit }: IAuthWindow) => {
	return (
		<Window>
			<FormWithValidate onSubmit={onSubmit}>
				<Window.Title>Окно входа</Window.Title>
				<Input
					defaultValue='maxi-q'
					name='username'
					type='text'
					placeholder='Логин'
					field={FieldNames.field}
				/>
				<Input
					defaultValue='evKBJHsdf4hriewiBSDIF777'
					name='password'
					type='password'
					placeholder='Пароль'
					field={FieldNames.password}
				/>
				<RButton>Войти</RButton>
			</FormWithValidate>
			<Link to='/Registration'>Еще не зарегистрированы? Регистрация</Link>
		</Window>
	)
}
