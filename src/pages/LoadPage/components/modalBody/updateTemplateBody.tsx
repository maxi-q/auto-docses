import { TemplateInDocumentType } from '@api/documents'
import Templates from '@api/templates'
import { FormWithValidate } from '@components/FormWithValidate'
import { ServerSetError } from '@helpers/ServerSetError'
import { FieldNames } from '@helpers/validator'
import { Button, Input } from '@ui/index'
import { useState } from 'react'
import { lotsSelectToArray } from '../../helpers/lotsSelectToArray'
import { modalStatusType } from '../../modules/ModalUpdateTemplate'

interface IUpdateTemplateBody {
	setModalStatus: React.Dispatch<
		React.SetStateAction<modalStatusType>
	>
	updateTable: Function
	template: TemplateInDocumentType
}

const UpdateTemplateBody = ({
	setModalStatus,
	updateTable,
	template,
}: IUpdateTemplateBody) => {
	const TemplatesManager = new Templates()
	const [serverError, setServerError] = useState<
		Array<{ key: string; errors: Array<string> }>
	>([])

	const onSubmit = (data: object) => {
		const sendTemplate: any = lotsSelectToArray(data)

		TemplatesManager.update({
			id: template.id,
			title: sendTemplate.title,
			description: sendTemplate.description,
			nameInDocument: sendTemplate.name_in_document,
			regex: sendTemplate.regex
		}).then(res => {
			if (res.status == 200) {
				setModalStatus('check')
				updateTable()
			} else {
				res.json().then(err => {
					setServerError(ServerSetError(err))
				})
			}
		})
	}
	return (
		<FormWithValidate onSubmit={onSubmit}>
			<Input
				defaultValue={template.title}
				field={FieldNames.field}
				placeholder={'Имя'}
				type='textarea'
				name={'title'}
			/>
			<Input
				defaultValue={template.description}
				field={FieldNames.field}
				placeholder={'Описание'}
				type='textarea'
				name={'description'}
			/>
			<Input
				defaultValue={template.name_in_document}
				field={FieldNames.nameInDocument}
				placeholder={'Имя в документе'}
				type='textarea'
				name={'name_in_document'}
			/>
			<Input
				defaultValue={template.regex.source}
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
			<Button type='submit'>Изменить шаблон</Button>
		</FormWithValidate>
	)
}

export { UpdateTemplateBody }
