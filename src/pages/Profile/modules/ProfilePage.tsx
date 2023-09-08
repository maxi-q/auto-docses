import { useContext } from 'react'
import { UserContext } from '../../../contexts'
import { ProfileCard } from '../components/ProfileCard'

interface IProfileData {}

export const ProfileData = ({}: IProfileData) => {
	const userContext = useContext(UserContext)

	return (
		<ProfileCard style={{ width: '90%' }}>
			<ProfileCard.Header>{userContext?.username}</ProfileCard.Header>
			<ProfileCard.Content>
				<ProfileCard.Field>{userContext?.email}</ProfileCard.Field>
				<ProfileCard.Link>Сменить пароль</ProfileCard.Link>
				<ProfileCard.Link>Удалить учётную запись</ProfileCard.Link>
			</ProfileCard.Content>
		</ProfileCard>
	)
}
