const MONTH = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря',
]
export const getFullDate = (date: string) => {
	const dateD = new Date(date)
	if(!dateD.getDate()) { return '' }
	return `${dateD.getDate()} ${MONTH[dateD.getMonth()]} ${dateD.getFullYear()}`
}

export const getTime = (date: string) => {
	const dateD = new Date(date)
	if(!dateD.getDate()) { return '' }
	return `${dateD.getHours()}:${dateD.getMinutes()}`
}