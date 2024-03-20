import Documents, { IDocumentPackageData } from '@api/documents'
import Templates, { ITemplateData } from '@api/templates'
import { FormWithValidate } from '@components/FormWithValidate'
import { FieldNames } from '@helpers/validator'
import { ISelectOptions, LotsSelect } from '@ui/Form/Selects/LotsSelect'
import { Button } from '@ui/index'
import { useEffect, useState } from 'react'
import { lotsSelectToArray } from '../../../../LoadPage/helpers/lotsSelectToArray'
import { modalStatusTypeInPackage } from '../Package/ModalDetailsDocumentPackage'

interface IModalAddDocument {
	packageId?: string
	packageDocuments?: IDocumentPackageData
	updateTable: () => void
	setIUpdating: React.Dispatch<React.SetStateAction<modalStatusTypeInPackage>>
}

const ModalAddDocument = ({
	packageDocuments,
	packageId,
	updateTable,
	setIUpdating,
}: IModalAddDocument) => {
	const [documents, setDocuments] = useState<Array<ISelectOptions>>()
	const documentsId = packageDocuments?.documents.map(document => document.id)
	const TemplatesManager = new Templates()
	const DocumentsManager = new Documents()
	useEffect(() => {
		DocumentsManager.getList({}).then(res => {
			if (res.status == 401) return

			res.json().then(data => {
				if (typeof data == 'object') {
					setDocuments(
						data.map((x: ITemplateData) => ({ label: x.title, value: x.id }))
					)
				}
			})
		})
	}, [])

	const onSubmit = async (data: object) => {
		// Здесь все работает!
		const sendDocument: any = lotsSelectToArray(data)

		const id = sendDocument.ids

		if (!packageId) return
		await DocumentsManager.updatePackage({
			id: packageId,
			documents: [...id],
		})

		updateTable()
		setIUpdating('check')
	}

	return (
		<FormWithValidate onSubmit={onSubmit}>
			{documents && (
				<LotsSelect
					value={documentsId}
					field={FieldNames.mayEmpty}
					placeholder={'Шаблоны'}
					name={'ids'}
					options={documents}
				/>
			)}

			<Button type='submit'>Изменить</Button>
		</FormWithValidate>
	)
}

export { ModalAddDocument }
