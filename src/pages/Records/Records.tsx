import Documents, {
	IDocumentPackageData,
	IOneDocumentData,
} from '@api/documents'
import Records, { IRecordData } from '@api/records'
import { getFullDate } from '@helpers/date'
import { Button } from '@ui/Button'
import { useEffect, useState, useContext } from 'react'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components'
import { ModalDetails } from './modules/Details'
import { AuthContext } from '../../contexts'
import { Navigate } from 'react-router-dom'
import { fetchRequestProfile } from '@api/user/profileData'

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


export const RecordsPage = ({ setUser, setLoggedIn }: NavigationType) => {
	const [records, setRecords] = useState<Array<IRecordData>>()

	const RecordsSerializer = new Records()
	const authContext = useContext(AuthContext)

	const [record, setRecord] = useState<IRecordData>()
	const [detailModal, setDetailModal] = useState(false)
	useEffect(() => {
		console.log(records)
	}, [records])

	useEffect(() => {
		
		RecordsSerializer.getList().then(res =>
			res.json().then(data => {
				setRecords(data.reverse())
			})
		)
		fetchRequestProfile().then(data => {
			if(data.status == 401) {
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
					{records?.map(oneRecord => {
						return (
							<tr>
								<th>{getFullDate(oneRecord.creation_date)}</th>
								<th>{oneRecord.documents_package.title}</th>
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
			{record && (
				<ModalDetails
					setModalActive={setDetailModal}
					modalActive={detailModal}
					record={record}
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
