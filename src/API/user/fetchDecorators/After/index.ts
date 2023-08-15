const API_URL = 'http://backend:8000/api/'

export type originalRequestType = {
	input: RequestInfo | URL
	init: RequestInit
	action: string | undefined
}

const getJWTTokenDecorator = (
	data: Response,
	originalRequest: originalRequestType
) => {
	console.log('Calculating JWT')

	// localStorage.setItem('accessToken', 'accessToken')
	// localStorage.setItem('refreshToken', 'refreshToken')

	const originalBody = originalRequest.init.body?.toString()

	if (!originalBody) {
		throw new Error('NOBODYIN getJWTTokenDecorator')
	}

	const body = JSON.parse(originalBody)

	const password = body['password']
	const username = body['username']

	console.log('password ', password, '. username ', username)

	const options: RequestInit = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
		},
		body: JSON.stringify({
			password: password,
			username: username,
		}),
	}

	console.log('options', options)

	fetch(API_URL + 'jwt/create/', options).then(data => {
		console.log(data)
		data.json().then(json => {
			console.log('json', json)
		})
	})
	console.log('I GOT JWT NOW')

	return data
}

export type AfterMyObjectType = {
	getJWTToken: Function
}
export const AfterMyObjectD: AfterMyObjectType = {
	getJWTToken: getJWTTokenDecorator,
}
