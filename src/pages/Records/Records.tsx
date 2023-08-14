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
	const [documentsPackages, setDocumentsPackages] =
		useState<Array<IDocumentPackageData>>()
	const [packagesWithRecords, setPackagesWithRecords] =
		useState<Array<packagesWithRecordsType>>()
	const RecordsSerializer = new Records()
	const documentPackageSerializer = new Documents()
	const authContext = useContext(AuthContext)

	const [record, setRecord] = useState<IRecordData>()
	const [detailModal, setDetailModal] = useState(false)
	useEffect(() => {
		console.log(records)
	}, [records])

	useEffect(() => {
		documentPackageSerializer.getPackagesList().then(res =>
			res.json().then(data => {
				setDocumentsPackages(data)
			})
		)
		RecordsSerializer.getList().then(res =>
			res.json().then(data => {
				setRecords(data)
			})
		)
		fetchRequestProfile().then(data => {
			if(data.status == 401) {
				setLoggedIn(false)
			}
			data.date_joined = getFullDate(data.date_joined)
			setUser(data)
		})
	}, [])

	useEffect(() => {
		console.log(records)
		if(records) {

			records &&
				documentsPackages &&
				setPackagesWithRecords(
					documentsPackages.map(Package => {
						const packageWithRecords: packagesWithRecordsType = {
							id: Package.id,
							author: Package.author,
							title: Package.title,
							documents: Package.documents,
							records: [],
						}
						records.map(record => {
							if (record.documents_package.id == Package.id) {
								packageWithRecords.records.push(record)
							}
						})
						return packageWithRecords
					})
				)
		}
	}, [records, documentsPackages])

	const changeDetailModal = (id: string) => {
		setDetailModal(true)
		setRecord(records?.find(x => x.id == id))
	}
	return (
		<Body>
			{!authContext && <Navigate to={'/Auth'} />}
			<MainTable>
				<tbody>
					{records?.map(irecord => {
						return (
							<tr>
								<th>{getFullDate(irecord.creation_date)}</th>
								<th>{irecord.documents_package.title}</th>
								<th>
									<Button onClick={() => changeDetailModal(irecord.id)}>
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
