import { FormWithValidate } from '@components/FormWithValidate'
import { FieldNames } from '@helpers/validator'
import { Input } from '@ui/index'
import { SubmitHandler } from 'react-hook-form'
import { RButton, Window } from '../ui'

interface IAuthWindow {
	onSubmit: SubmitHandler<Object>
	serverError: Array<{ key: string; errors: Array<string> }>
}

export const EmailWindow = ({ onSubmit, serverError }: IAuthWindow) => {
	return (
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
		</Window>
	)
}
