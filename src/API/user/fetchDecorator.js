import { URL } from '@constants/API.js'
import handler from '@helpers/handlerForObject'


const addJWTTockenDecorator = (data) => {
  data.test = 'test'
  return data
}
let BeforeMyObject = {
  'addJWTTocken': addJWTTockenDecorator,
}
BeforeMyObject = new Proxy(BeforeMyObject, handler);


const getJWTTockenDecorator = (data) => {
  data
    .clone()
    .json()
    .then(body => {
      // save JWT
    })
    .catch(err => console.error(err))

  return data
}
let AfterMyObject = {
  'getJWTTocken': getJWTTockenDecorator,
}
AfterMyObject = new Proxy(AfterMyObject, handler);


const {fetch: origFetch} = window

window.fetch = async (...args) => {
  const keyForX = args.slice(2)
  args = args.slice(0, 2)


  let body = JSON.parse(args[1]['body'])
  
  body = BeforeMyObject[keyForX](body)
  args = [args[0], body]

  const response = await origFetch(...args)
  var asddqweds = 0
  /* work with the cloned response in a separate promise
     chain -- could use the same chain with `await`. */
  response
    .clone()
    .json()
    .then(body => asddqweds = body)
    .catch(err => console.error(err))
  ;

  const mockResponse = AfterMyObject[keyForX](response)

  /* the original( mock:) ) response can be resolved unmodified: */
  return mockResponse;
  
  /* or mock the response: */
  return {
    ok: true,
    status: 200,
    json: async () => ({
      userId: 1,
      id: 1,
      title: "Mocked!!",
      completed: false
    })
  };
};


export const Tseaetr = () => {
    const options = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          one: {
            'username': 'username',
            'password': 'password'
          }, 
          two: {
              'username': 'ewq',
              'password': 'qwe'
          }}
        )
      }

    fetch('https://my-json-server.typicode.com/typicode/demo/posts', options, 'addJWTTocken')
        .then(resp => resp.json())
        .then(data => 0)
}