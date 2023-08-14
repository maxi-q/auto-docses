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
	async (): Promise<IRequestProfileCallback > => {

		const access = localStorage.getItem('access')

		const options = {
			method: 'GET',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access}`,
			}),
		}

		const response = await fetch(ServerURL + 'users/me/', options)

		const data: IRequestProfileCallbackData = await response.json()
		if (response.status == 401) {

			return {status: 401, ...data}
		}

		return { status: 200, ...data }
	}
