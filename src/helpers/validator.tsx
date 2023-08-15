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
	mayEmpty = 'mayEmpty',
	title = 'title',
	nameInDocument = 'nameInDocument'
}
const validator: IValidator<typeof FieldNames> = {
	login: {
		required: 'Логин обязателен!',
		minLength: {
			value: 3,
			message: 'Логин должен быть длиной 3+ символов.',
		},
	},
	title: {
		required: 'Это поле обязательно!',
		minLength: {
			value: 7,
			message: 'Поле должно быть длиной 7+ символов.',
		},
		maxLength: {
			value: 27,
			message: 'Поле должно быть максимум длиной 27 символов.',
		},
	},
	field: {
		required: 'Это поле обязательно!',
		minLength: {
			value: 3,
			message: 'Поле должен быть длиной 3+ символов.',
		},
	},
	mayEmpty: {},
	email: {
		required: 'Почта обязательна!',
		pattern: {
			value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
			message: 'Невалидная почта.',
		},
	},
	nameInDocument: {
		required: 'Ключ в документе обязателен!',
		pattern: {
			value: /^{{[a-zA-Z-_]+}}$/,
			message: '{{ключ}}.',
		},
		maxLength: {
			value: 24,
			message: 'Максимум 24 символа',
		}
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
