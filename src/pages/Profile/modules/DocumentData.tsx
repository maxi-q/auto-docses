import Documents, { IOneDocumentData } from '@api/documents'
import { Modal } from '@ui/Modal'
import { DocumentsTable } from './Tables/DocumentsTable'
import { FormWithValidate } from '@components/FormWithValidate'
import { ServerSetError } from '@helpers/ServerSetError'
import { FieldNames } from '@helpers/validator'
import { Input, Button } from '@ui/index'
import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/esm/Table'

interface IDocumentsData {
	allDocuments: Array<IOneDocumentData> | undefined
	updateTable: Function
}
export const DocumentsData = ({ allDocuments, updateTable }: IDocumentsData) => {
	console.log(allDocuments)
	const [modalUpdateDocument, setModalUpdateDocument] = useState(false)
	const [document, setDocument] = useState<IOneDocumentData>()
	const [documentId, setDocumentId] = useState<string>()
	const documentsSerializer = new Documents()
	const [serverError, setServerError] = useState<
		Array<{ key: string; errors: Array<string> }>
	>([])

	const DocumentsManager = new Documents()
	useEffect(()=>{
		documentId && documentsSerializer.read({ id: documentId }).then(res => {
			res.json().then(data => {
				setDocument(data)
			})
		})
	}, [documentId])

	const onSubmit = async (data: object) => {
		const sendDocument: any = data
		
		documentId &&
			DocumentsManager.update({
				id: documentId,
				title: sendDocument.title,
				description: sendDocument.description,
			}).then(res => {
				if (res.ok) {
					setModalUpdateDocument(false)
					updateTable()
				} else {
					res.json().then(err => {
						setServerError(ServerSetError(err))
					})
				}
			})
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
					<DocumentsTable setModalUpdateDocument={setModalUpdateDocument} setDocumentId={setDocumentId} allDocuments={allDocuments} />
				</tbody>
			</Table>

			<Modal setActive={setModalUpdateDocument} active={modalUpdateDocument}>
				<FormWithValidate onSubmit={onSubmit}>
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
				</FormWithValidate>
			</Modal>
		</>
	)
}
