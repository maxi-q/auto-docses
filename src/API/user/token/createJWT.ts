import { API_URL } from '@constants/API'
import { fetchM } from '../../../helpers/fetchM'

console.log(process.env)
interface IRequestJWTData {
	username: string | null
	password: string | null
}
interface IRequestJWTCallbackData {
	status: number
	access: string
	refresh: string
}
export interface IRequestJWTCallback {
	status: number
	access?: string
	refresh?: string
}

export const fetchRequestJWT = async ({
	username,
	password,
}: IRequestJWTData) => {
	console.log(process.env.API_URL)
	const options = {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
		body: JSON.stringify({
			username: username,
			password: password,
		}),
	}

	return fetchM(API_URL + 'auth/jwt/create/', options)

}
