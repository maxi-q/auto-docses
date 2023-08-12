import { FormWithValidate } from '@components/FormWithValidate'
import { FieldNames } from '@helpers/validator'
import { Input } from '@ui/index'
import { SubmitHandler } from 'react-hook-form'
import { RButton, Window } from '../ui'

interface IAuthWindow {
	onSubmit: SubmitHandler<Object>
}

export const EmailWindow = ({ onSubmit }: IAuthWindow) => {
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
		</Window>
	)
}
