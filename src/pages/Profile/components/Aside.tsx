import { Clock, Folder, Person } from 'react-bootstrap-icons'
import styled from 'styled-components'
import { Button, HideButton } from '../../../ui'

import { useState } from 'react'
import { IUser, fetchRequestProfile } from '../../../API/user/profileData'
import { COLORS } from '../../../constants/style/COLORS'

export const Aside = () => {
	const [dataProfile, setDataProfile] = useState<IUser>({
		id: '',
		username: '',
		email: '',
	})
	const data = fetchRequestProfile().then(data => {
		setDataProfile(data)
	})
	return (
		<>
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
		</>
	)
}

const ButtonM = styled(Button)`
	margin: 0 0 25px 15px;
	font-size: 16px;

	background-color: ${COLORS.blue300};
	color: ${COLORS.blue700};

	border: 2px solid ${COLORS.blue300};
	&:hover {
		color: ${COLORS.blue100};
		background-color: ${COLORS.blue800};
		border-color: ${COLORS.blue800};
	}
`
const Info = styled.div`
	padding: 1.2rem 0 0 0;
	min-width: 256px;
	min-height: 500px;
	height: min-content;
`
