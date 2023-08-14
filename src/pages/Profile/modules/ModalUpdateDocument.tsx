import Documents, { IOneDocumentData } from '@api/documents'
import { FormWithValidate } from '@components/FormWithValidate'
import { FieldNames } from '@helpers/validator'
import { Button, Input } from '@ui/index'
import { useState } from 'react'
import { lotsSelectToArray } from '../../LoadPage/helpers/lotsSelectToArray'

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

	documentsSerializer.read({ id: documentId }).then(res => {
		res.json().then(data => {
			setDocument(data)
		})
	})

	const DocumentsManager = new Documents()
	const onSubmit = async (data: object) => {
		// Здесь все работает!
		const sendDocument: any = lotsSelectToArray(data)

		documentId &&
			(await DocumentsManager.update({
				id: documentId,
				title: sendDocument.title,
				description: sendDocument.description,
			}))
		// Здесь все работает!
		setIUpdating('check')
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
			<Button type='submit'>Изменить документ</Button>
		</FormWithValidate>
	)
}

export { ModalUpdateDocument }
