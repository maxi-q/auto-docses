import { URL } from '@consts/API.js'
import { fechDataForCreateJWT } from './fetchRequestForCreateJWT'

export const fechDataForRegistration = async ({
      username,
      password 
    }) => {
  const options = {
    method: "GET",
    headers: new Headers({
        'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      'username': username,
      'password': password
    })
  }

  const response = await fetch(URL + 'user/', options)
  const data = await response.json()

  await fechDataForCreateJWT({
      'username': username, 
      'password': password
    })
}