import Documents, { IDocumentPackageData, IOneDocumentData } from '@api/documents'
import Templates, { ITemplateData } from '@api/templates'
import { FormWithValidate } from '@components/FormWithValidate'
import { FieldNames } from '@helpers/validator'
import { ISelectOptions } from '@ui/Form/Selects/LotsSelect'
import { Button, Input, Modal } from '@ui/index'
import { useContext, useEffect, useState } from 'react'
import { DocumentContext } from '../../../contexts'
import { lotsSelectToArray } from '../../../pages/LoadPage/helpers/lotsSelectToArray'

interface IModalAddTemplate {
	setModalActive: React.Dispatch<React.SetStateAction<boolean>>
	modalActive: boolean
	document: IOneDocumentData
}

const ModalAddTemplate = ({
	setModalActive,
	modalActive,
	document
}: IModalAddTemplate) => {
	const [templates, setTemplates] = useState<Array<ISelectOptions>>()

	const TemplatesManager = new Templates()
	const DocumentManager = new Documents()

	useEffect(() => {
		TemplatesManager.getList().then(res =>
			res.json().then(data => {
				if (typeof data == 'object') {
					setTemplates(
						data.map((x: ITemplateData) => ({ label: x.title, value: x.id }))
					)
				}
			})
		)
	}, [])

	const onSubmit = (data: object) => {
		// Здесь все работает!
		const sendTemplate: any = lotsSelectToArray(data)

		TemplatesManager.create({
			title: sendTemplate.title,
			description: sendTemplate.description,
			nameInDocument: sendTemplate.name_in_document,
		}).then(res => {
			res
				.json()
				.then(data => {
					const template_id = data.id

					DocumentManager.update({
						id: document?.id || '',
						title: document?.title,
						templates: [...(document?.templates.map(x => x.id) || []), template_id],
					})
						.catch(err => {
							console.log(err)
						})
				})
				.catch(err => {
					console.log(err)
				})
		})
		// Здесь все работает!
	}
	return (
		<Modal setActive={setModalActive} active={modalActive}>
			<FormWithValidate onSubmit={onSubmit}>
				<Input
					field={FieldNames.field}
					placeholder={'Имя'}
					type='textarea'
					name={'title'}
				/>
				<Input
					field={FieldNames.field}
					placeholder={'Описание'}
					type='textarea'
					name={'description'}
				/>
				<Input
					field={FieldNames.mayEmpty}
					placeholder={'Имя в документе'}
					type='textarea'
					name={'name_in_document'}
				/>

				<Button type='submit'>Добавить шаблон</Button>
			</FormWithValidate>
		</Modal>
	)
}

export { ModalAddTemplate }
