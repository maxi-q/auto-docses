import { Clock, Folder, Person } from 'react-bootstrap-icons'
import styled from 'styled-components'

import { Button, HideButton } from '../../ui'

const Rows = () => {
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
//
const Title = styled.h3`
	font-size: 13px;
	font-weight: bold;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`
const Change = styled.h4`
	font-size: 12px;
`
const Card = styled.div`
	cursor: pointer;

	margin: 10px;
	padding: 5px;
	width: 250px;
	height: 100px;

	background-color: rgb(190, 190, 190);
	border-radius: 10px;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

	transition: all 0.5s;
	&:hover {
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22),
			0px -10px 100px -68px rgba(34, 60, 80, 0.25) inset;
	}
`

import { ReactNode } from 'react'
import Table from 'react-bootstrap/Table'

export const Profile = () => {
	return (
		<Body>
			<Info>
				<ButtonM>Добавить документ</ButtonM>
				<HideButton folder active>
					{' '}
					<Folder style={{ fontSize: '26px' }} /> Папки
				</HideButton>
				<HideButton folder>
					{' '}
					<Clock style={{ fontSize: '26px' }} /> Недавнее
				</HideButton>
				<HideButton>
					{' '}
					<Person style={{ fontSize: '26px' }} /> Доступные мне
				</HideButton>
			</Info>
			<MTable striped>
				<thead>
					<tr>
						<th>Имя</th>
						<th>Дата изменения</th>
					</tr>
				</thead>
				<tbody>
					<Rows />
				</tbody>
			</MTable>
		</Body>
	)
}

const MTable = styled(Table)`
	height: min-content;
`
const ButtonM = styled(Button)`
	margin: 0 0 25px 15px;
`
const Body = styled.div`
	background-color: transparent;
	min-height: 500px;
	display: flex;
	width: 100%;
	margin-right: auto;
	margin-left: auto;
`
const Disc = styled.div`
	flex-grow: 1;
	display: flex;
	background-color: #e3e1e1;
	width: 80%;
	flex-wrap: wrap;
`
const Info = styled.div`
	padding: 1.2rem 0 0 0;
	width: 256px;
	min-height: 500px;
	height: min-content;
`
