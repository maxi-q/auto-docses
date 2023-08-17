export const ServerSetError = (err: any) => {
	const error = []
	console.log('err', err)
	for (const [key, value] of Object.entries(err)) {
		if (!value) continue
		if (value instanceof Array) {
			error.push({ key: key, errors: value })
		}else if(typeof value == 'string') {
			error.push({ key: key, errors: [value] })
		}
	}
  return error
}
