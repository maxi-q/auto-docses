import Documents, {
	IDocumentPackageData,
	IOneDocumentData,
} from '@api/documents'
import Records, { IRecordData } from '@api/records'
import { COLORS } from '@constants/style/COLORS'
import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components'

type simpleTemplateType = {
	id: string
	title: string
}

type templateValueType = {
	template: simpleTemplateType
	value: string
}

type recordInPackageType = {
	id: string
	creationDate: Date
	templateValues: Array<templateValueType>
}
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
	records: Array<recordInPackageType>
}

export const RecordsPage = () => {
	const [records, setRecords] = useState<Array<IRecordData>>()
	const [documentsPackages, setDocumentsPackages] =
		useState<Array<IDocumentPackageData>>()
	const [packagesWithRecords, setPackagesWithRecords] =
		useState<Array<packagesWithRecordsType>>()
	const RecordsSerializer = new Records()
	const documentPackageSerializer = new Documents()

	useEffect(() => {
		console.log(records)
		console.log(documentsPackages)
	}, [records, documentsPackages])

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
	}, [])

	useEffect(() => {
		records && documentsPackages && 
		documentsPackages.map(Package => {
			records.map(record => {
				if(record.document_package.id == Package.id) {
					const packageWithRecords: packagesWithRecordsType = {
						id: '',
						author: {
							id: '',
							email: '',
							username: ''
						},
						title: '',
						documents: [],
						records: []
					}
				}
			})
		})
	}, [records, documentsPackages])
	return (
		<Body>
			<MainTable>
				<tbody>
					{/* {documentPackages && (
						<DocumentTable
							setModalDocumentActive={setModalDocumentActive}
							setPackageDocuments={setPackageDocuments}
							setPackageId={setPackageId}
							documentPackage={documentPackages}
							setDocumentId={setDocumentId}
							setModalUpdateActive={setModalUpdateActive}
							setModalDeleteActive={setModalDeleteActive}
						/>
					)} */}
				</tbody>
			</MainTable>
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
	background-color: ${COLORS.blue100};
`
