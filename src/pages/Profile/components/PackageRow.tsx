import { IDocumentPackageData, IOneDocumentData } from '@api/documents'
import { COLORS } from '@constants/style/COLORS'
import { Button } from '@ui/Button'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import userContext from '../../../contexts/user-context'

interface IDocumentPackageRow {
	documents: Array<IOneDocumentData>
	documentPackage: IDocumentPackageData
	setPackageId: Function
	setPackageDocuments: Function
	setModalDocumentActive: Function
	setDocumentId: Function
	setModalUpdateActive: Function
	setModalDeleteActive: Function
	setModalDetailsActive: Function
}
export const DocumentPackageRow = ({
	documents,
	documentPackage,
	setPackageId,
	setPackageDocuments,
	setModalDocumentActive,
	setDocumentId,
	setModalUpdateActive,
	setModalDeleteActive,
	setModalDetailsActive
}: IDocumentPackageRow) => {
	const [active, setActive] = useState(false)
	const user = useContext(userContext)

	const navigate = useNavigate()

	const ChangeDocument = (id: string, index: number) => {
		navigate(`/LoadPage/${id}/${index}`)
	}

	const addDocument = (id: string, documents: Array<IOneDocumentData>) => {
		setPackageId(id)
		setPackageDocuments(documents.map(x => x.id))
		setModalDocumentActive(true)
	}

	const updateDocument = (id: string) => {
		setDocumentId(id)
		setModalUpdateActive(true)
	}

	const deleteDocument = (id: string) => {
		setDocumentId(id)
		setModalDeleteActive(true)
	}

	return (
		<>
			<Row>
				<td>{documentPackage.title}</td>
				<td>{documentPackage.author.username}</td>
				<td>
					<Button
						onClick={() => {
							setModalDetailsActive(true)
							setPackageId(documentPackage.id)
						}}
					>
						Детали
					</Button>
				</td>
			</Row>
		</>
	)
}

const Row = styled.tr`
	cursor: pointer;
	&:hover {
		background-color: ${COLORS.blue200};
	}
`
