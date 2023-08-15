import { fetchM } from '../../../helpers/fetchM'

const API_URL = 'http://backend:8000/api/'

interface IVerifyJWTCallbackData {
	status: number
}
export interface IVerifyJWTCallback {
	status: number
}

export const fetchVerifyJWT = async (): Promise<IVerifyJWTCallback> => {
	const access = localStorage.getItem('access')
	const options = {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
		body: JSON.stringify({
			token: access,
		}),
	}

	const response = await fetchM(API_URL + 'auth/jwt/verify/', options)

	if (response.status == 200) {
		return { status: 200 }
	}
	localStorage.setItem('access', '')
	return { status: 400 }
}
