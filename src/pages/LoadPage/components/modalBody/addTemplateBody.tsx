import Documents, { IOneDocumentData } from '@api/documents'
import Templates from '@api/templates'
import { FormWithValidate } from '@components/FormWithValidate'
import { ServerSetError } from '@helpers/ServerSetError'
import { FieldNames } from '@helpers/validator'
import { Button, Input } from '@ui/index'
import { useState } from 'react'
import { lotsSelectToArray } from '../../helpers/lotsSelectToArray'
import { modalStatusType } from '../../modules/ModalUpdateTemplate'
import { Console } from 'console'

interface IModalAddTemplate {
	document: IOneDocumentData
	addTemplate: Function
	setModalStatus: React.Dispatch<
		React.SetStateAction<modalStatusType>
	>
	updateTable: Function
}

const AddTemplateBody = ({
	document,
	addTemplate,
	setModalStatus,
	updateTable,
}: IModalAddTemplate) => {
	const TemplatesManager = new Templates()
	const DocumentManager = new Documents()
	const [serverError, setServerError] = useState<
		Array<{ key: string; errors: Array<string> }>
	>([])

	const toAddExist = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		setModalStatus('addExist')
	}

	const onSubmit = (data: object) => {
		// Здесь все работает!
		const sendTemplate: any = lotsSelectToArray(data)
		console.log(data, sendTemplate)

		TemplatesManager.create({
			title: sendTemplate.title,
			description: sendTemplate.description,
			nameInDocument: sendTemplate.name_in_document,
			regex: sendTemplate.regex
		}).then(res => {
			if (res.ok) {
				res.json().then(data => {
					const template_id = data.id
					DocumentManager.update({
						id: document?.id || '',
						title: document?.title,
						templates: [
							...(document?.templates.map(x => x.id) || []),
							template_id,
						],
					}).then(res => {
						if (res.ok == true) {
							addTemplate({
								name_in_document: data.title,
								title: data.title,
								id: data.id,
								value: '',
							})
							setModalStatus('check')
							updateTable()
						} else {
							res.json().then(err => {
								setServerError(ServerSetError(err))
							})
						}
					})
				})
			} else {
				res.json().then(err => {
					setServerError(ServerSetError(err))
				})
			}
		})
		// Здесь все работает!
	}

	return (
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
				field={FieldNames.nameInDocument}
				placeholder={'Имя в документе'}
				type='textarea'
				name={'name_in_document'}
			/>
			<Input
				field={FieldNames.regex}
				placeholder={'Регулярное выражение'}
				type='textarea'
				name={'regex'}
			/>
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
			<Button type='submit'>Добавить шаблон</Button>
			<Button onClick={toAddExist}>Уже создан?</Button>
		</FormWithValidate>
	)
}

export { AddTemplateBody }
