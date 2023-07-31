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
export const getFullDate = (date) => {
	date = new Date(date)
	if(!date.getDate()) { return '' }
  console.log(date)
	return `${date.getDate()} ${MONTH[date.getMonth()]} ${date.getFullYear()}`
}
