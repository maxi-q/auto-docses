// import handler from '../../helpers/handlerForObject'
// import { AfterMyObjectD, AfterMyObjectType, originalRequestType } from './fetchDecorators/After'
// import { BeforeMyObjectD, BeforeMyObjectType } from './fetchDecorators/Before'

// const proxy = process.env.proxy
// 	? process.env.proxy
// 	: 'http://192.168.0.107:5000/api/v1/'

// // --------------------
// const BeforeMyObject = new Proxy(BeforeMyObjectD, handler)
// const AfterMyObject = new Proxy(AfterMyObjectD, handler)
// // --------------------

// const { fetch: origFetch } = window

// window.fetch = async (
// 	input: RequestInfo | URL,
// 	init: RequestInit = {},
// 	action?: string
// ) => {
// 	const originalRequest: originalRequestType = { input: input, init: init, action: action }

// 	const keyForX = action

// 	const bodyCommon = init?.body || ''
// 	let body = JSON.parse(typeof bodyCommon == 'string' ? bodyCommon : '')

// 	body = BeforeMyObject[keyForX as keyof BeforeMyObjectType](body)
// 	init.body = JSON.stringify(body)

// 	const response = await origFetch(input, init)

// 	/* work with the cloned response in a separate promise
//      chain -- could use the same chain with `await`. */
// 	response
// 		.clone()
// 		.json()
// 		.then(body => console.log())
// 		.catch(err => console.error(err))

// 	const mockResponse =
// 		AfterMyObject[keyForX as keyof AfterMyObjectType](response, originalRequest)

// 	/* the original( mock:) ) response can be resolved unmodified: */
// 	return mockResponse

// 	/* or mock the response: */

// 	const mockR: Response = {
// 		ok: true,
// 		status: 200,
// 		json: async () => ({
// 			userId: 1,
// 			id: 1,
// 			title: 'Mocked!!',
// 			completed: false,
// 		}),
// 	} as Response
// 	return mockR
// }
