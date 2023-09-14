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
	updateTable: () => void
}

const ModalCreateDocumentPackage = ({
	setModalActive,
	modalActive,
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
		// Здесь все работает!
		const sendDocument: any = lotsSelectToArray(data)

		DocumentsManager.createPackage({
			title: sendDocument.title_package,
			documents: [],
		}).then(_ => {
			updateTable()
			setModalActive(false)
		})

		// Здесь все работает!
	}
	return (
		<Modal setActive={setModalActive} active={modalActive}>
			<FormWithValidate onSubmit={onSubmit}>
				<Input
					field={FieldNames.field}
					placeholder={'Название пакета'}
					type='textarea'
					name={'title_package'}
				/>
				{/* <Input
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
				)} */}

				<Button type='submit'>Создать пакет</Button>
			</FormWithValidate>
		</Modal>
	)
}

export { ModalCreateDocumentPackage }
