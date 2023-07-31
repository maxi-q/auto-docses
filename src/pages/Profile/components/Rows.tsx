import styled from 'styled-components'
import { ReactNode } from 'react'

export const Rows = () => {
	const month = [
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
	const oneCard = {
		id: 1,
		title: 'Согласие_на_изображение_РИД_Правила_для_14-18.pdf',
		dateOfChange: new Date(),
	}
	const html: ReactNode = (
		<>
			{[oneCard, oneCard, oneCard].map((card, id) => (
				<Row key={id}>
					<td>{card.title}</td>
					<td>
						{card.dateOfChange.getDate()} {month[card.dateOfChange.getMonth()]}{' '}
						{card.dateOfChange.getFullYear()}
					</td>
				</Row>
			))}
		</>
	)
	return html
}

const Row = styled.tr`
	height: 30px;
	cursor: pointer;

	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`