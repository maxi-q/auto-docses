import Documents, { IDocumentPackageData } from '@api/documents'
import { ButtonCircle } from '@ui/ButtonCircle'
import { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import { fetchRequestProfile } from '../../API/user/profileData'
import { COLORS } from '../../constants/style/COLORS'
import { AuthContext, UserContext } from '../../contexts'
import { getFullDate } from '../../helpers/date'
import { Button } from '../../ui'
import { DefaultTemplateValues } from './modules/DTamplate'
import { DocumentTable } from './modules/DocumentTable'
import { ModalAddDocumentPackage } from './modules/ModalAddPackage'
import { ModalUpdateDocument } from './modules/ModalUpdateDocument'
import { ModalAddDocument } from './modules/ModallAddDocumentq'
import { ModalDeleteDocument } from './modules/ModalDeleteDocument'

type NavigationType = {
	setUser: Function
	setLoggedIn: Function
}

export const Profile = ({ setUser, setLoggedIn }: NavigationType) => {
	const [documentPackages, setDocumentPackages] =
		useState<Array<IDocumentPackageData>>()

	const [modalActivePackage, setModalPackageActive] = useState(false)
	const [modalActiveDocument, setModalDocumentActive] = useState(false)
	const [modalUpdateActive, setModalUpdateActive] = useState(false)
	const [modalDeleteActive, setModalDeleteActive] = useState(false)

	const [packageId, setPackageId] = useState<string>()
	const [documentId, setDocumentId] = useState<string>()
	const [packageDocuments, setPackageDocuments] = useState<Array<string>>()

	const authContext = useContext(AuthContext)
	const userContext = useContext(UserContext)

	const documentsSerializer = new Documents()

	useEffect(() => {
		fetchRequestProfile()
			.then(data => {
				data.date_joined = getFullDate(new Date(data.date_joined))
				setUser(data)
			})
			.catch(_error => {
				setLoggedIn(false)
				localStorage.setItem('access', '')
			})

		documentsSerializer.getPackagesList().then(res => {
			res.json().then(data => {
				setDocumentPackages(data)
			})
		})
	}, [])

	const addDocument = () => {
		setModalPackageActive(true)
	}

	const logOut = () => {
		setLoggedIn(false)
		localStorage.setItem('access', '')
	}

	return (
		<Body>
			<Main>
				{!authContext && <Navigate to={'/Auth'} />}
				<Info>
					<Title> Hello, {userContext.username} </Title>
					{userContext.first_name} {userContext.last_name}
					<br />
					{userContext.email}
				</Info>
				<MyTemplates>
					<DefaultTemplateValues />
				</MyTemplates>
				<Button onClick={logOut}>Выйти</Button>
			</Main>
			<MainTable>
				<thead>
					<tr>
						<th style={{ paddingLeft: '20px' }}>Название</th>
						<th>Автор</th>
						<th>Поля</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					{documentPackages && (
						<DocumentTable
							setModalDocumentActive={setModalDocumentActive}
							setPackageDocuments={setPackageDocuments}
							setPackageId={setPackageId}
							documentPackage={documentPackages}
							setDocumentId={setDocumentId}
							setModalUpdateActive={setModalUpdateActive}
							setModalDeleteActive={setModalDeleteActive}
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

			<ModalUpdateDocument
				setModalActive={setModalUpdateActive}
				modalActive={modalUpdateActive}
				documentId={documentId}
			/>

			<ModalDeleteDocument
				setModalActive={setModalDeleteActive}
				modalActive={modalDeleteActive}
				documentId={documentId}
			/>
		</Body>
	)
}
const MyTemplates = styled.div`
	flex: 1;
`
const Info = styled.p``
const Text = styled.span`
	font-weight: 100;
`
const Main = styled.div`
	padding: 15px;
	width: 40%;
	height: Math(92vh - 62px);
	background-color: ${COLORS.blue100};
	display: flex;
	flex-direction: column;
`
const MainTable = styled(Table)`
	min-height: 30px;
	height: min-content;
	background-color: ${COLORS.blue100};
`
const Body = styled.div`
	background-color: transparent;
	min-height: 90vh;
	display: flex;
	width: 100%;
	margin-right: auto;
	margin-left: auto;
`
const TableBlock = styled.div`
	background-color: transparent;
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-right: auto;
	margin-left: auto;
	padding-top: 1%;
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
