import { fetchM } from '../../../helpers/fetchM'

const ServerURL = process.env.ServerURL
	? process.env.ServerURL
	: 'http://26.81.229.58:9000/api/v1/'

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

	const response = await fetchM(ServerURL + 'auth/jwt/create/', options)
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
