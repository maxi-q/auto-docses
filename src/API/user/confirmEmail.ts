import { fetchM } from '../../helpers/fetchM'
import { fetchRequestJWT } from './token/createJWT'

import { API_URL } from '@constants/API'

interface IConfirmEmailData {
	username: string
	confirmation_code: string
}
export interface IConfirmEmailCallback {
	status?: number
}

export const fetchConfirmEmail = async ({
	username,
	confirmation_code,
}: IConfirmEmailData): Promise<IConfirmEmailCallback> => {
	const options = {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
		body: JSON.stringify({
			username: username,
			confirmation_code: confirmation_code,
		}),
	}

	const response = await fetchM(API_URL + 'auth/confirm_email/', options)
	// , 'getJWTToken'
	const data: object = await response.json()

	console.log('_-_')
	console.log(response)
	console.log(data)

	if (response.status == 200) {
		const password = localStorage.getItem('password')

		fetchRequestJWT({ username: username, password: password })

		return { status: 200 }
	}
	return { status: 400 }
}
