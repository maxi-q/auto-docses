import Documents, { IOneDocumentData } from '@api/documents'
import { ButtonCircle } from '@ui/ButtonCircle'
import { Modal } from '@ui/Modal'
import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/esm/Table'
import styled from 'styled-components'
import { DocumentsTable } from './Tables/DocumentsTable'
import { ModalDeleteDocument } from './modals/Document/ModalDeleteDocument'
import { ModalUpdateDocumentD } from './modals/Document/ModalUpdateDocumentInDocument'

export type modalStatusTypeInDocument = 'update' | 'delete'

interface IDocumentsData {
	allDocuments: Array<IOneDocumentData> | undefined
	updateTable: () => void
	addDocument: () => void
	setDocumentId: React.Dispatch<React.SetStateAction<string | undefined>>
	documentId: string | undefined
}

export const DocumentsData = ({
	allDocuments,
	updateTable,
	addDocument,
	setDocumentId,
	documentId,
}: IDocumentsData) => {
	console.log(allDocuments)
	const [modalUpdateDocument, setModalUpdateDocument] = useState(false)
	const [document, setDocument] = useState<IOneDocumentData>()
	const [modalStatus, setModalStatus] =
		useState<modalStatusTypeInDocument>('update')
	const documentsSerializer = new Documents()

	useEffect(() => {
		documentId &&
			documentsSerializer.read({ id: documentId }).then(res => {
				res.json().then(data => {
					setDocument(data)
				})
			})
	}, [documentId])

	const closeModal = () => {
		setModalStatus('update')
		setModalUpdateDocument(false)
	}
	const returnUpdate = () => {
		setModalStatus('update')
	}

	return (
		<>
			<Table>
				<thead>
					<tr>
						<th style={{ paddingLeft: '20px' }}>Название</th>
						<th>Дата создания</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<DocumentsTable
						setModalUpdateDocument={setModalUpdateDocument}
						setDocumentId={setDocumentId}
						allDocuments={allDocuments}
					/>
				</tbody>
			</Table>

			<AddDocumentBlock>
				<AddDocumentButton onClick={addDocument}>+</AddDocumentButton>
			</AddDocumentBlock>

			<Modal
				setActive={modalStatus == 'update' ? closeModal : returnUpdate}
				active={modalUpdateDocument}
			>
				{modalStatus == 'update' ? (
					documentId && (
						<ModalUpdateDocumentD
							updateTable={updateTable}
							documentId={documentId}
							setActive={setModalUpdateDocument}
							setModalStatus={setModalStatus}
						/>
					)
				) : modalStatus == 'delete' ? (
					<ModalDeleteDocument
						setActive={setModalUpdateDocument}
						updateTable={updateTable}
						setModalStatus={setModalStatus}
						documentId={documentId}
					/>
				) : (
					<>Error</>
				)}
			</Modal>
		</>
	)
}

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
	/* <FormWithValidate onSubmit={onSubmit}>
					{document && (
						<>
							<Input
								defaultValue={document.title}
								field={FieldNames.field}
								placeholder={'Название'}
								type='textarea'
								name={'title'}
							/>
							<Input
								defaultValue={document.description}
								field={FieldNames.mayEmpty}
								placeholder={'Описание'}
								type='textarea'
								name={'description'}
							/>
						</>
					)}
					{serverError.map(x => (
						<>
							{x.key}: <br />
							{x.errors.map(w => (
								<>
									{w}
									<br />
								</>
							))}
						</>
					))}
					<Button type='submit'>Изменить документ</Button>
				</FormWithValidate> */
}
