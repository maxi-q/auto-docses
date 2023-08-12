import Documents, { IOneDocumentData } from '@api/documents'
import { FormWithValidate } from '@components/FormWithValidate'
import { FieldNames } from '@helpers/validator'
import { Button, Input, Modal } from '@ui/index'
import { useState } from 'react'
import { lotsSelectToArray } from '../../LoadPage/helpers/lotsSelectToArray'

interface IModalUpdateDocument {
	setModalActive: React.Dispatch<React.SetStateAction<boolean>>
	modalActive: boolean
	documentId?: string
}

const ModalUpdateDocument = ({
	setModalActive,
	modalActive,
	documentId,
}: IModalUpdateDocument) => {
	const [document, setDocument] = useState<IOneDocumentData>()
	const documentsSerializer = new Documents()

	documentId &&
		documentsSerializer.read({ id: documentId }).then(res => {
			res.json().then(data => {
				setDocument(data)
			})
		})

	const DocumentsManager = new Documents()
	const onSubmit = (data: object) => {
		// Здесь все работает!
		const sendDocument: any = lotsSelectToArray(data)

		documentId &&
			DocumentsManager.update({
				id: documentId,
				title: sendDocument.title,
				description: sendDocument.description,
			})
		// Здесь все работает!
	}
	return (
		<Modal setActive={setModalActive} active={modalActive}>
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
		</Modal>
	)
}

export { ModalUpdateDocument }
