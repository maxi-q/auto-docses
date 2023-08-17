import { Input } from '@ui/index'
import { Errors, RButton, Window } from '../ui'
import { FieldNames } from '@helpers/validator'
import { FormWithValidate } from '@components/FormWithValidate'
import { Link } from 'react-router-dom'
import { IRegistrationCallback } from '@api/user/register'
import { SubmitHandler } from 'react-hook-form'

interface IRegWindow {
	onSubmit: SubmitHandler<Object>
	serverError: Array<{ key: string; errors: Array<string> }>
}

export const RegWindow = ({onSubmit, serverError}: IRegWindow) => {
	return (
		<Window>
			<FormWithValidate onSubmit={onSubmit}>
				{/* <Window.Title>Окно регистрации</Window.Title> */}
				<Input
					name='username'
					placeholder='Логин'
					field={FieldNames.username}
				/>
				<Input
					name='email'
					placeholder='Почта'
					field={FieldNames.email}
				/>
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

				<RButton>Регистрация</RButton>
			</FormWithValidate>
			<Errors>
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
			</Errors>
			<Link to='/Auth'>Уже зарегистрированы? Вход</Link>
		</Window>
	)
}
