import { SERVER_URL } from '@constants/API.js'
import { fechDataForCreateJWT } from './fetchRequestForCreateJWT'

export const fechDataForRegistration = async ({
      email,
      username,
      password
    }) => {
  const options = {
    method: "POST",
    headers: new Headers({
        'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      'email': email,
      'username': username,
      'password': password
    })
  }

  const response = await fetch(URL + 'user/', options)
  const data = await response.json()
}