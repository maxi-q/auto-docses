import { SERVER_URL } from '@constants/API.js'


export const fechDataForCreateJWT = async ({
      username,
      password
    }) => {
    
  const options = {
    method: "POST",
    headers: new Headers({
        'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
        'username': username,
        'password': password
    })
  }

  await fetch(URL + 'jwt/create/', options)
    .then(response => response.json())
    .then(json => console.log(json))

}