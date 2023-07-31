const addJWTTokenDecorator = (data: any) => {
	return data
}
export type BeforeMyObjectType = {
	addJWTToken: Function
}
export let BeforeMyObjectD: BeforeMyObjectType = {
	addJWTToken: addJWTTokenDecorator,
}