import { fetchM } from '../../../helpers/fetchM'

const PROXY = process.env.PROXY
	? process.env.PROXY
	: 'http://26.81.229.58:9000/api/v1/'

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

	const response = await fetchM(PROXY + 'auth/jwt/verify/', options)

	if (response.status == 200) {
		return { status: 200 }
	}
	localStorage.setItem('access', '')
	return { status: 400 }
}
