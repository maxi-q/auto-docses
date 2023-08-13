import Documents, { IOneDocumentData } from '@api/documents'
import { FormWithValidate } from '@components/FormWithValidate'
import { FieldNames } from '@helpers/validator'
import { Button, Input, Modal } from '@ui/index'
import { useState } from 'react'
import { lotsSelectToArray } from '../../LoadPage/helpers/lotsSelectToArray'

interface IModalUpdatePackage { 
  packageId: string
	setIUpdating:  React.Dispatch<React.SetStateAction<'check' | 'documentUpdate' | 'packageUpdate'>>
}
const ModalUpdatePackage = ({
	packageId,
	setIUpdating
}: IModalUpdatePackage) => {
	const [packageI, setPackage] = useState<IOneDocumentData>()
	const documentsSerializer = new Documents()

		documentsSerializer.readPackage({ id: packageId }).then(res => {
			res.json().then(data => {
				setPackage(data)
			})
		})

	const DocumentsManager = new Documents()
	const onSubmit = async (data: object) => {
		// Здесь все работает!
		const sendDocument: any = lotsSelectToArray(data)

		packageI &&
			await DocumentsManager.updatePackage({
				id: packageI.id,
				title: sendDocument.title,
			})
		// Здесь все работает!
		setIUpdating('check')
	}
	return (
			<FormWithValidate onSubmit={onSubmit}>
				{packageI && (
					<>
						<Input
							defaultValue={packageI.title}
							field={FieldNames.field}
							placeholder={'Название'}
							type='textarea'
							name={'title'}
						/>
					</>
				)}
				<Button type='submit'>Изменить пакет</Button>
			</FormWithValidate>
	)
}

export { ModalUpdatePackage }
