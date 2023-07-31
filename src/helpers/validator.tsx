import { RegisterOptions } from 'react-hook-form/dist/types'

type IValidator<T> = {
	[K in keyof T]: RegisterOptions
}

export enum FieldNames {
	login = 'login',
	field = 'field',
	email = 'email',
	password = 'password',
	select = 'select',
	username = 'username',
}

const validator: IValidator<typeof FieldNames> = {
	login: {
		required: 'Логин обязателен!',
		minLength: {
			value: 3,
			message: 'Логин должен быть длиной 3+ символов.',
		},
	},
	field: {
		required: 'Это поле обязательно!',
		minLength: {
			value: 3,
			message: 'Поле должен быть длиной 3+ символов.',
		},
	},
	email: {
		required: 'Почта обязательна!',
		pattern: {
			value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
			message: 'Невалидная почта.',
		},
	},
	password: {
		required: 'Пароль обязателен!',
		minLength: {
			value: 5,
			message: 'Пароль должен быть длиной 5+ символов.',
		},
	},
	select: {
		required: 'Поле обязательно!',
		minLength: {
			value: 1,
			message: 'Поле 6+.',
		},
	},
	username: {
		required: 'Имя обязательно!',
		minLength: {
			value: 4,
			message: 'Имя более 4 символов.',
		},
		pattern: {
			value: /^[a-zA-ZА-Яа-я\w]+$/,
			message: 'Только Буквы и цифры без пробелов',
		},
	},
}

export default validator
