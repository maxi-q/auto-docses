export const ServerSetError = (err: any) => {
	const error = []
	for (const [key, value] of Object.entries(err)) {
		if (!value) continue
		if (value instanceof Array) {
			error.push({ key: key, errors: value })
		}
	}
  return error
}
