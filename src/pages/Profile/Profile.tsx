import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Documents, { IDocumentPackageData, IOneDocumentData } from '@api/documents'
import { fetchRequestProfile } from '@api/user/profileData'
import { getFullDate } from '@helpers/date'
import { ButtonCircle } from '@ui/ButtonCircle'
import { UserContext } from '../../contexts'

import { fetchVerifyJWT } from '@api/user/token/verifyJWT'
import { COLORS } from '@constants/style/COLORS'
import { DocumentsData } from './modules/DocumentData'
import { PackageData } from './modules/PackageData'
import { ProfileData } from './modules/ProfileData'
import { ModalAddDocument } from './modules/modals/ModalAddDocument'
import { ModalAddDocumentPackage } from './modules/modals/ModalAddPackage'
import { ModalDeleteDocument } from './modules/modals/ModalDeleteDocument'
import { ModalDetailsDocumentPackage } from './modules/modals/ModalDetailsDocumentPackage'
import { DefaultTemplateValues } from './modules/DefaultTemplate'

type NavigationType = {
	setUser: Function
	setLoggedIn: Function
}

export const Profile = ({ setUser, setLoggedIn }: NavigationType) => {
	const [documentPackages, setDocumentPackages] =
		useState<Array<IDocumentPackageData>>()
	const [allDocuments, setAllDocuments] =
		useState<Array<IOneDocumentData>>()

	const [pageState, setPageState] = useState<
		'profile' | 'documents' | 'packages' | 'fields'
	>('profile')
	const [modalActivePackage, setModalPackageActive] = useState(false)
	const [modalActiveDocument, setModalDocumentActive] = useState(false)
	const [modalDeleteActive, setModalDeleteActive] = useState(false)
	const [modalDetailsActive, setModalDetailsActive] = useState(false)

	const [packageId, setPackageId] = useState<string>()
	const [documentId, setDocumentId] = useState<string>()
	const [packageDocuments, setPackageDocuments] = useState<Array<string>>()

	const userContext = useContext(UserContext)
	const navigate = useNavigate()
	const documentsSerializer = new Documents()

	useEffect(() => {
		updateTable()
	}, [])

	const updateTable = () => {
		fetchVerifyJWT().then(res => {
			if (res.status != 200) {
				navigate('/Auth')
				setLoggedIn(false)
			}
		})
		fetchRequestProfile().then(user => {
			setUser(user)

			documentsSerializer
				.getPackagesList({ authorId: user.username })
				.then(res => {
					res.json().then(data => {
						setDocumentPackages(data)
					})
				})
			documentsSerializer
				.getList({ authorId: user.username })
				.then(res => {
					res.json().then(data => {
						setAllDocuments(data)
					})
				})
		})
	}

	const addDocument = () => {
		setModalPackageActive(true)
	}
	const ProfilePage = {
		profile: <ProfileData />,
		documents: <DocumentsData updateTable={updateTable} allDocuments={allDocuments}/>,
		packages: (
			<PackageData
				documentPackages={documentPackages}
				setPackageId={setPackageId}
				setModalDetailsActive={setModalDetailsActive}
			/>
		),
		fields: <DefaultTemplateValues/>,
	}
	return (
		<Body>
			<Main>
				<Info>
					<Title>Профиль</Title>
					<ClickedLink
						onClick={() => setPageState('profile')}
						active={pageState == 'profile'}
					>
						Учётная запись
					</ClickedLink>
					<ClickedLink
						onClick={() => setPageState('documents')}
						active={pageState == 'documents'}
					>
						Документы
					</ClickedLink>
					<ClickedLink
						onClick={() => setPageState('packages')}
						active={pageState == 'packages'}
					>
						Пакеты документов
					</ClickedLink>
					<ClickedLink
						onClick={() => setPageState('fields')}
						active={pageState == 'fields'}
					>
						Данные
					</ClickedLink>
				</Info>
			</Main>
			<MainTable>{ProfilePage[pageState]}</MainTable>

			<AddDocumentBlock>
				<AddDocumentButton onClick={addDocument}>+</AddDocumentButton>
			</AddDocumentBlock>

			<ModalAddDocumentPackage
				setModalActive={setModalPackageActive}
				modalActive={modalActivePackage}
			/>

			<ModalAddDocument
				setModalActive={setModalDocumentActive}
				modalActive={modalActiveDocument}
				packageId={packageId}
				packageDocuments={packageDocuments}
			/>

			<ModalDeleteDocument
				setModalActive={setModalDeleteActive}
				modalActive={modalDeleteActive}
				documentId={documentId}
			/>

			<ModalDetailsDocumentPackage
				setModalActive={setModalDetailsActive}
				modalActive={modalDetailsActive}
				packageId={packageId}
			/>
		</Body>
	)
}
const MyTemplates = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	flex: 1;
`
const ClickedLink = styled.h6<{ active?: boolean }>`
	cursor: pointer;
	margin: 30px 0;
	color: ${p => (p.active ? `${COLORS.gos_black}` : `${COLORS.gos_blue}`)};

	font-size: 16px;
	line-height: 24px;
	font-weight: 400;
`

const Info = styled.div``

const Main = styled.div`
	padding: 45px 15px 15px 15px;
	width: 30%;
	height: 100%;
	display: flex;
	flex-direction: column;
`
const MainTable = styled.div`
	min-height: 30px;
	height: min-content;
	width: 100%;
	padding: 45px 0 0 0;
`
const Body = styled.div`
	background-color: transparent;
	height: 100vh;
	display: flex;
	width: 100%;
	padding: 0 0 0 5%;
`
const Title = styled.h2``

const AddDocumentButton = styled(ButtonCircle)`
	width: 80px;
	height: 80px;
	font-size: 30px;
	margin: 0 8px 0 0;
	position: absolute;
	bottom: 20px;
	right: 20px;
`
const AddDocumentBlock = styled.div`
	display: absolute;
	down: 20px;
	right: 20px;
	margin: 1% 0 0 0;
`
{
	/* <Aside />
			<TableBlock>
				<Title>Документы</Title>
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
			</TableBlock> */
}
