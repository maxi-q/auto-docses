import { realpathSync } from 'fs'
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
}: IConfirmEmailData) => {
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

	const response = fetchM(API_URL + 'auth/confirm_email/', options)
	
	return response
}
