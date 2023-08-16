import { fetchM } from '../../../helpers/fetchM'

console.log(process.env)
const API_URL = 'https://backend:8000/api/'

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
}: IRequestJWTData): Promise<IRequestJWTCallback> => {
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

	const response = await fetchM(API_URL + 'auth/jwt/create/', options)
	// , 'getJWTToken'
	const data: IRequestJWTCallbackData = await response.json()

	if (response.status == 200) {
		localStorage.setItem('access', data.access)
		localStorage.setItem('refresh', data.refresh)
		localStorage.setItem('password', password || '')
		localStorage.setItem('username', username || '')

		return { status: 200 }
	}
	console.log(data)
	return { status: 400 }
}
