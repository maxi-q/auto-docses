import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Documents, {
	IDocumentPackageData,
	IOneDocumentData,
} from '@api/documents'
import { fetchRequestProfile } from '@api/user/profileData'

import { fetchVerifyJWT } from '@api/user/token/verifyJWT'
import { COLORS } from '@constants/style/COLORS'
import { DocumentsData } from './modules/DocumentPage'
import { PackageData } from './modules/PackagePage'
import { ProfileData } from './modules/ProfilePage'
import { DefaultTemplateValues } from './modules/TemplatesPage'
import { ModalCreateDocument } from './modules/modals/Document/ModalCreateDocument'
import { ModalCreateDocumentPackage } from './modules/modals/Package/ModalCreatePackage'

type NavigationType = {
	setUser: Function
	setLoggedIn: Function
}

export const Profile = ({ setUser, setLoggedIn }: NavigationType) => {
	const [documentPackages, setDocumentPackages] =
		useState<Array<IDocumentPackageData>>()
	const [allDocuments, setAllDocuments] = useState<Array<IOneDocumentData>>()

	const [pageState, setPageState] = useState<
		'profile' | 'documents' | 'packages' | 'fields'
	>('profile')
	const [modalActivePackage, setModalPackageActive] = useState(false)
	const [modalActiveDocument, setModalDocumentActive] = useState(false)

	const [packageId, setPackageId] = useState<string>()
	const [documentId, setDocumentId] = useState<string>()
	const [packageDocuments, setPackageDocuments] = useState<Array<string>>()

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
			documentsSerializer.getList({ authorId: user.username }).then(res => {
				res.json().then(data => {
					setAllDocuments(data)
				})
			})
		})
	}

	const addPackage = () => {
		setModalPackageActive(true)
	}
	const addDocument = () => {
		setPackageId(undefined)
		setModalDocumentActive(true)
	}

	const ProfilePage = {
		profile: <ProfileData />,
		documents: (
			<DocumentsData
				addDocument={addDocument}
				updateTable={updateTable}
				allDocuments={allDocuments}
				setDocumentId={setDocumentId}
				documentId={documentId}
			/>
		),
		packages: (
			<PackageData
				addPackage={addPackage}
				updateTable={updateTable}
				documentPackages={documentPackages}
				setPackageId={setPackageId}
				packageId={packageId}
			/>
		),
		fields: <DefaultTemplateValues />,
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

			<ModalCreateDocumentPackage
				updateTable={updateTable}
				setModalActive={setModalPackageActive}
				modalActive={modalActivePackage}
			/>

			<ModalCreateDocument
				updateTable={updateTable}
				setModalActive={setModalDocumentActive}
				modalActive={modalActiveDocument}
				packageId={packageId}
				packageDocuments={packageDocuments}
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
