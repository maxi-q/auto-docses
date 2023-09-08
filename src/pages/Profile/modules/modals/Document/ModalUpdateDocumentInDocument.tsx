import Documents, { IOneDocumentData } from '@api/documents'
import { FormWithValidate } from '@components/FormWithValidate'
import { ServerSetError } from '@helpers/ServerSetError'
import { FieldNames } from '@helpers/validator'
import { Button, Input } from '@ui/index'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { lotsSelectToArray } from '../../../../LoadPage/helpers/lotsSelectToArray'
import { modalStatusTypeInDocument } from '../../DocumentPage'

interface IModalUpdateDocument {
	documentId: string
	setActive: React.Dispatch<React.SetStateAction<boolean>>
	setModalStatus: React.Dispatch<
		React.SetStateAction<modalStatusTypeInDocument>
	>
	updateTable: () => void
}

const ModalUpdateDocumentD = ({
	documentId,
	setActive,
	setModalStatus,
	updateTable,
}: IModalUpdateDocument) => {
	const [document, setDocument] = useState<IOneDocumentData>()
	const documentsSerializer = new Documents()
	const [serverError, setServerError] = useState<
		Array<{ key: string; errors: Array<string> }>
	>([])

	useEffect(() => {
		documentsSerializer.read({ id: documentId }).then(res => {
			res.json().then(data => {
				setDocument(data)
			})
		})
	}, [documentId])

	const deleteDocument = () => {
		console.log(`delete ${documentId}`)
		setModalStatus('delete')
	}

	const DocumentsManager = new Documents()
	const onSubmit = async (data: object) => {
		const sendDocument: any = lotsSelectToArray(data)
		documentId &&
			DocumentsManager.update({
				id: documentId,
				title: sendDocument.title,
				description: sendDocument.description,
			}).then(res => {
				if (res.ok) {
					setActive(false)
					setModalStatus('update')
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
				<ButtonBlock>
					<Button onClick={deleteDocument}>Удалить</Button>
					<Button type='submit'>Изменить</Button>
				</ButtonBlock>
			</FormWithValidate>
		</>
	)
}

export { ModalUpdateDocumentD }

const ButtonBlock = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`
