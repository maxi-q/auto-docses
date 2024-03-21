import Documents, { IDocumentPackageData, IOneDocumentData } from '@api/documents'
import Records, { IRecordData } from '@api/records'
import { fetchRequestProfile } from '@api/user/profileData'
import { getFullDate } from '@helpers/date'
import { Button } from '@ui/Button'
import { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Navigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../../contexts'
import { ModalDetails, ModalDetailsGovno } from './modules/Details'

type authorType = {
	id: string
	email: string
	username: string
}
type packagesWithRecordsType = {
	id: string
	author: authorType
	title: string
	documents: Array<IOneDocumentData>
	records: Array<IRecordData>
}
type NavigationType = {
	setUser: Function
	setLoggedIn: Function
}

export const RecordsForId = ({ setUser, setLoggedIn }: NavigationType) => {
	const [records, setRecords] = useState<Array<IRecordData>>()
	const params = useParams()
	const packageId = params.id
	const RecordsSerializer = new Records()
	const DocumentsSerializer = new Documents()

	const authContext = useContext(AuthContext)

	const [record, setRecord] = useState<IRecordData>()
	const [nowPackage, setNowPackage] = useState<IDocumentPackageData>()
	const [detailModal, setDetailModal] = useState(false)
	
	useEffect(() => {
		if (!packageId) return
		RecordsSerializer.getPackageList({ documents_package_id: packageId }).then(
			res =>
				res.json().then((data) => {
					setRecords(data.reverse())
				})
		)
		DocumentsSerializer.readPackage({id: packageId}).then(
			res =>
				res.json().then((data) => {
					setNowPackage(data)
				})
		)
		fetchRequestProfile().then(data => {
			if (data.status == 401) {
				setLoggedIn(false)
			}
			setUser(data)
		})
	}, [])

	const changeDetailModal = (id: string) => {
		setDetailModal(true)
		setRecord(records?.find(x => x.id == id))
	}
	return (
		<Body>
			{!authContext && <Navigate to={'/Auth'} />}
			<MainTable>
				<tbody>
					{nowPackage && records?.map(oneRecord => {
						return (
							<tr>
								<th>{getFullDate(oneRecord.creation_date)}</th>
								<th>{nowPackage.title}</th>
								<th>
									<Button onClick={() => changeDetailModal(oneRecord.id)}>
										Детали
									</Button>
								</th>
							</tr>
						)
					})}
				</tbody>
			</MainTable>
			{record && nowPackage && (
				<ModalDetailsGovno
					setModalActive={setDetailModal}
					modalActive={detailModal}
					record={record}
					nowPackage={nowPackage}
				/>
			)}
		</Body>
	)
}
const Body = styled.div`
	background-color: transparent;
	min-height: 500px;
	display: flex;
	width: 100%;
	margin-right: auto;
	margin-left: auto;
`
const MainTable = styled(Table)`
	min-height: 30px;
	height: min-content;
`
