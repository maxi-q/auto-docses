import { IOneDocumentData } from '@api/documents'
import { COLORS } from '@constants/style/COLORS'
import { getFullDate } from '@helpers/date'
import { Button } from '@ui/Button'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface IDocumentsTable {
	allDocuments: Array<IOneDocumentData> | undefined
	setDocumentId: React.Dispatch<React.SetStateAction<string | undefined>>
	setModalUpdateDocument: React.Dispatch<React.SetStateAction<boolean>>
}

export const DocumentsTable = ({
	allDocuments,
	setDocumentId,
	setModalUpdateDocument,
}: IDocumentsTable) => {
	if (!allDocuments) return <></>
	const navigate = useNavigate()

	const updateDocument = (id: string) => {
		setDocumentId(id)
		setModalUpdateDocument(true)
	}
	const View = (id: string) => {
		setDocumentId(id)
		navigate(`/View/${id}`)

	}
	return (
		<>
			{allDocuments.map((document, i) => {
				return (
					<Row key={i}>
						<td>{document.title}</td>
						<td>{getFullDate(document.creation_date)}</td>
						<ButtonsCol>
							<Button onClick={() => updateDocument(document.id)}>
								Редактировать
							</Button>
							<Button onClick={() => View(document.id)}>Просмотр</Button>
						</ButtonsCol>
					</Row>
				)
			})}
		</>
	)
}

const ButtonsCol = styled.td`
	display: flex;
	flex-direction: row;
	gap: 10px;
`
const Row = styled.tr`
	cursor: pointer;
	&:hover {
		background-color: ${COLORS.blue200};
	}
`
