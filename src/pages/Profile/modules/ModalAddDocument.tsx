import Documents from '@api/documents'
import Templates, { ITemplateData } from '@api/templates'
import { FormWithValidate } from '@components/FormWithValidate'
import { FieldNames } from '@helpers/validator'
import { ISelectOptions, LotsSelect } from '@ui/Form/Selects/LotsSelect'
import { Button, Input, Modal } from '@ui/index'
import { useEffect, useState } from 'react'
import { lotsSelectToArray } from '../../LoadPage/helpers/lotsSelectToArray'

interface IModalAddDocument {
	setModalActive: React.Dispatch<React.SetStateAction<boolean>>
	modalActive: boolean
	packageId?: string
	packageDocuments?: Array<string>
}

const ModalAddDocument = ({
	setModalActive,
	modalActive,
	packageDocuments,
	packageId,
}: IModalAddDocument) => {
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
		if (!packageId) return
		if (!packageDocuments) return

		// Здесь все работает!
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
					res.json().then(data => {
						const id = data.id

						DocumentsManager.updatePackage({
							id: packageId,
							documents: [...packageDocuments, id],
						})
					})
				}
			})
			.catch(err => {
				console.log(err)
			})
		// Здесь все работает!
	}
	return (
		<Modal setActive={setModalActive} active={modalActive}>
			<FormWithValidate onSubmit={onSubmit}>
				<Input
					field={FieldNames.field}
					placeholder={'Файл'}
					type='file'
					name={'file'}
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

export { ModalAddDocument }
