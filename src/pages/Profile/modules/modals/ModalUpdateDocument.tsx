import Documents, { IOneDocumentData } from '@api/documents'
import { FormWithValidate } from '@components/FormWithValidate'
import { ServerSetError } from '@helpers/ServerSetError'
import { FieldNames } from '@helpers/validator'
import { Button, Input } from '@ui/index'
import { useState } from 'react'
import { lotsSelectToArray } from '../../../LoadPage/helpers/lotsSelectToArray'

interface IModalUpdateDocument {
	documentId: string
	setIUpdating: React.Dispatch<
		React.SetStateAction<'check' | 'documentUpdate' | 'packageUpdate'>
	>
}

const ModalUpdateDocument = ({
	documentId,
	setIUpdating,
}: IModalUpdateDocument) => {
	const [document, setDocument] = useState<IOneDocumentData>()
	const documentsSerializer = new Documents()
	const [serverError, setServerError] = useState<
		Array<{ key: string; errors: Array<string> }>
	>([])

	documentsSerializer.read({ id: documentId }).then(res => {
		res.json().then(data => {
			setDocument(data)
		})
	})

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
					setIUpdating('check')
				} else {
					res.json().then(err => {
						setServerError(ServerSetError(err))
					})
				}
			})
	}
	return (
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
	)
}

export { ModalUpdateDocument }
