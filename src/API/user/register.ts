import { fetchM } from '../../helpers/fetchM'

const proxy = process.env.proxy
	? process.env.proxy
	: 'http://26.81.229.58:9000/api/v1/'

interface IRegistrationData {
	username: string
	password: string
	last_name: string
	first_name: string
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
	last_name,
	first_name,
	email,
}: IRegistrationData): Promise<IRegistrationCallback> => {
	const options = {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
		body: JSON.stringify({
			username: username,
			password: password,
			last_name: last_name,
			first_name: first_name,
			email: email,
		}),
	}

	const response = await fetchM(proxy + 'auth/signup/', options)
	// , 'getJWTToken'
	const data: object = await response.json()

	if (response.status == 400) {
		return { ...data, status: response.status }
	}
	if (response.status == 201) {
		const options = {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify({
				username: username,
			}),
		}
		await fetchM(proxy + 'auth/send_confirm_code/', options)

		localStorage.setItem('password', password)
		localStorage.setItem('username', username)

		return { status: 201, regUsername: username }
	}
	return { status: 201 }
}
