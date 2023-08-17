import { FormWithValidate } from '@components/FormWithValidate'
import { FieldNames } from '@helpers/validator'
import { Input } from '@ui/index'
import { SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { RButton, Window } from '../ui'

interface IAuthWindow {
	onSubmit: SubmitHandler<Object>
	serverError: Array<{ key: string; errors: Array<string> }>
	
}

export const AuthWindow = ({ onSubmit, serverError }: IAuthWindow) => {
	
	return (
		<Window>
			<FormWithValidate onSubmit={onSubmit}>
				{/* <Window.Title>Окно входа</Window.Title> */}
				<Input
					defaultValue={localStorage.getItem('username') || ''}
					name='username'
					type='text'
					placeholder='Логин'
					field={FieldNames.username}
				/>
				<Input
					defaultValue={localStorage.getItem('password') || ''}
					name='password'
					type='password'
					placeholder='Пароль'
					field={FieldNames.password}
				/>
				<RButton>Войти</RButton>
			</FormWithValidate>
			{serverError.map(x => (
				<>
					{x.key}: <br />
					{x.errors.map(w => (
						<>
							{w}
							<br />
						</>
					))}
				</>
			))}
			<Link to='/Registration'>Еще не зарегистрированы? Регистрация</Link>
		</Window>
	)
}
