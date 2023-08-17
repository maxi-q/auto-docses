import { fetchM } from '../../helpers/fetchM'

import { API_URL } from '@constants/API'

interface IRegistrationData {
	username: string
	password: string
	email: string
}
export interface IRegistrationCallback {
	status?: number
	regUsername?: string
	username?: Array<string>
	password?: Array<string>
	non_field_errors?: Array<string>
}

export const fetchDataForRegistration = async ({
	username,
	password,
	email,
}: IRegistrationData) => {
	const options = {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
		body: JSON.stringify({
			username: username,
			password: password,
			email: email,
		}),
	}

	const response = fetchM(API_URL + 'auth/signup/', options)
	response.then(res => {
		if (res.status == 201) {
			const options = {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json',
				}),
				body: JSON.stringify({
					username: username,
				}),
			}
			fetchM(API_URL + 'auth/send_confirm_code/', options)
			localStorage.setItem('password', password)
			localStorage.setItem('username', username)
	
		}
	})
	return response

	
}
