import Documents from '@api/documents'
import Templates, { ITemplateData } from '@api/templates'
import { FormWithValidate } from '@components/FormWithValidate'
import { FieldNames } from '@helpers/validator'
import { ISelectOptions, LotsSelect } from '@ui/Form/Selects/LotsSelect'
import { Button, Input, Modal } from '@ui/index'
import { useEffect, useState } from 'react'
import { lotsSelectToArray } from '../../../../LoadPage/helpers/lotsSelectToArray'

interface IModalCreateDocument {
	setModalActive: React.Dispatch<React.SetStateAction<boolean>>
	modalActive: boolean
	packageId?: string
	packageDocuments?: Array<string>
	updateTable: () => void
}

const ModalCreateDocument = ({
	setModalActive,
	modalActive,
	packageDocuments,
	packageId,
	updateTable,
}: IModalCreateDocument) => {
	const [templates, setTemplates] = useState<Array<ISelectOptions>>()

	const TemplatesManager = new Templates()
	useEffect(() => {
		TemplatesManager.getList().then(res => {
			if (res.status == 401) return

			res.json().then(data => {
				if (typeof data == 'object') {
					setTemplates(
						data.map((x: ITemplateData) => ({ label: x.title, value: x.id }))
					)
				}
			})
		})
	}, [])

	const DocumentsManager = new Documents()
	const onSubmit = (data: object) => {
		const sendDocument: any = lotsSelectToArray(data)

		DocumentsManager.create({
			title: sendDocument.title,
			description: sendDocument.description,
			templates: sendDocument.templates,
			file: sendDocument.file[0],
		})
			.then(res => {
				if (res instanceof Response) {
					if (res.status == 401) return
					if (!packageId) {
						updateTable()
						return
					}
					if (!packageDocuments) return

					res.json().then(data => {
						const id = data.id

						DocumentsManager.updatePackage({
							id: packageId,
							documents: [...packageDocuments, id],
						}).then(_ => updateTable())
					})
				}
			})
			.catch(err => {
				console.log(err)
			})
	}
	return (
		<Modal setActive={setModalActive} active={modalActive}>
			<FormWithValidate onSubmit={onSubmit}>
				<Input
					field={FieldNames.field}
					placeholder={'Файл'}
					type='file'
					name={'file'}
					accept={".docx"}
				/>
				<Input
					field={FieldNames.field}
					placeholder={'Название'}
					type='textarea'
					name={'title'}
				/>
				<Input
					field={FieldNames.mayEmpty}
					placeholder={'Описание'}
					type='textarea'
					name={'description'}
				/>
				{templates && (
					<LotsSelect
						field={FieldNames.mayEmpty}
						placeholder={'Шаблоны'}
						name={'templates'}
						options={templates}
					/>
				)}

				<Button type='submit'>Заполнить документ</Button>
			</FormWithValidate>
		</Modal>
	)
}

export { ModalCreateDocument }
