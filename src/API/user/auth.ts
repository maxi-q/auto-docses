import { fetchM } from '../../helpers/fetchM'

const ServerURL = process.env.ServerURL
	? process.env.ServerURL
	: 'http://26.81.229.58:9000/api/v1/'

interface IAuthorizationData {
	username: string
	password: string
	last_name: string
	first_name: string
	email: string
}
export interface IAuthorizationCallback {
	status?: number
	regUsername?: string
	username?: Array<string>
	password?: Array<string>
	non_field_errors?: Array<string>
}

export const fetchDataForAuthorization = async ({
	username,
	password
}: IAuthorizationData): Promise<IAuthorizationCallback> => {
	const options = {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
		body: JSON.stringify({
			username: username,
			password: password
		}),
	}

	const response = await fetchM(ServerURL + 'auth/signup/', options)
	// , 'getJWTToken'
	const data: object = await response.json()
	


	if(response.status == 400) {
		return {...data, status: response.status}
	}
	if(response.status == 201) {
		const options = {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify({
				username: username
			}),
		}
		await fetchM(ServerURL + 'auth/send_confirm_code/', options)

		localStorage.setItem("password", password)
		localStorage.setItem("username", username)

		return {status: 201, regUsername: username}
	}
	return {status: 201}
}
