import { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Documents, { IDocumentPackageData } from '@api/documents'
import { fetchRequestProfile } from '@api/user/profileData'
import { getFullDate } from '@helpers/date'
import { ButtonCircle } from '@ui/ButtonCircle'
import { AuthContext, UserContext } from '../../contexts'

import { DefaultTemplateValues } from './modules/DefaultTemplate'
import { DocumentTable } from './modules/DocumentTable'
import { ModalAddDocument } from './modules/ModalAddDocument'
import { ModalAddDocumentPackage } from './modules/ModalAddPackage'
import { ModalDeleteDocument } from './modules/ModalDeleteDocument'
import { ModalDetailsDocumentPackage } from './modules/ModalDetailsDocumentPackage'

type NavigationType = {
	setUser: Function
	setLoggedIn: Function
}

export const Profile = ({ setUser, setLoggedIn }: NavigationType) => {
	const [documentPackages, setDocumentPackages] =
		useState<Array<IDocumentPackageData>>()

	const [modalActivePackage, setModalPackageActive] = useState(false)
	const [modalActiveDocument, setModalDocumentActive] = useState(false)
	const [modalDeleteActive, setModalDeleteActive] = useState(false)
	const [modalDetailsActive, setModalDetailsActive] = useState(false)

	const [packageId, setPackageId] = useState<string>()
	const [documentId, setDocumentId] = useState<string>()
	const [packageDocuments, setPackageDocuments] = useState<Array<string>>()

	const authContext = useContext(AuthContext)
	const userContext = useContext(UserContext)
	const navigate = useNavigate()
	const documentsSerializer = new Documents()

	useEffect(() => {
		if (!authContext) {
			navigate('/Auth')
			return
		}
		fetchRequestProfile().then(user => {
			user.date_joined = getFullDate(user.date_joined)
			setUser(user)

			documentsSerializer.getPackagesList({ authorId: user.username }).then(res => {
				res.json().then(data => {
					setDocumentPackages(data)
				})
			})
		})
		console.log('userContext', userContext)
	}, [])

	const addDocument = () => {
		setModalPackageActive(true)
	}

	return (
		<Body>
			<Main>
				<Info>
					<Title> Привет, {userContext?.username} </Title>
					{userContext?.first_name} {userContext?.last_name}
					<br />
				</Info>
				<MyTemplates>
					<DefaultTemplateValues />
				</MyTemplates>
			</Main>
			<MainTable>
				<thead>
					<tr>
						<th style={{ paddingLeft: '20px' }}>Название</th>
						<th>Автор</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{documentPackages && (
						<DocumentTable
							documentPackages={documentPackages}
							setModalDetailsActive={setModalDetailsActive}
							setPackageId={setPackageId}
						/>
					)}
				</tbody>
			</MainTable>

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
const Info = styled.p``

const Main = styled.div`
	padding: 15px;
	width: 40%;
	height: 100%;
	display: flex;
	flex-direction: column;
`
const MainTable = styled(Table)`
	min-height: 30px;
	height: min-content;
`
const Body = styled.div`
	background-color: transparent;
	height: 100vh;
	display: flex;
	width: 100%;
	margin-right: auto;
	margin-left: auto;
`
const Title = styled.h3``

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
