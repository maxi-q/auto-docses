const ServerURL = process.env.ServerURL
	? process.env.ServerURL
	: 'http://26.81.229.58:9000/api/v1/'

interface IRequestProfileCallbackData {
	id: string
	username: string
	email: string
	first_name: string
	last_name: string
	date_joined: string
}
export interface IUser extends IRequestProfileCallbackData {}

export interface IRequestProfileCallback extends IRequestProfileCallbackData {
	status: number
}

export const fetchRequestProfile =
	async (): Promise<IRequestProfileCallback> => {
		console.log(123)

		const access = localStorage.getItem('access')
		const options = {
			method: 'GET',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access}`,
			}),
		}
		console.log(access)

		const response = await fetch(ServerURL + 'users/me/', options)
		// , 'getJWTToken'
		console.log(response, options)

		const data: IRequestProfileCallbackData = await response.json()

		console.log('_-_')
		console.log(response)
		console.log(data)

		console.log(data)
		return { status: 200, ...data }
	}
