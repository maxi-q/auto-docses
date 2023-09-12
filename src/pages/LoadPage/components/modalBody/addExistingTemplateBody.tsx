import Documents, { IOneDocumentData } from '@api/documents'
import Templates, { ITemplateData } from '@api/templates'
import { FormWithValidate } from '@components/FormWithValidate'
import { ServerSetError } from '@helpers/ServerSetError'
import { FieldNames } from '@helpers/validator'
import { ISelectOptions } from '@ui/Form/Selects/LotsSelect'
import { Select } from '@ui/Form/Selects/Select'
import { Button } from '@ui/index'
import { useEffect, useState } from 'react'
import { lotsSelectToArray } from '../../helpers/lotsSelectToArray'
import { modalStatusType } from '../../modules/ModalUpdateTemplate'

interface IAddExistingTemplateBody {
	document: IOneDocumentData
	setModalStatus: React.Dispatch<
		React.SetStateAction<modalStatusType>
	>
	updateTable: Function
}

const AddExistingTemplateBody = ({
	document,
	setModalStatus,
	updateTable,
}: IAddExistingTemplateBody) => {
	const TemplatesManager = new Templates()
	const DocumentManager = new Documents()
	const [serverError, setServerError] = useState<
		Array<{ key: string; errors: Array<string> }>
	>([])
	const [templates, setTemplates] = useState<Array<ISelectOptions>>([])

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

	const onSubmit = (data: object) => {
		// Здесь все работает!
		const sendTemplate: any = lotsSelectToArray(data)
		DocumentManager.update({
			id: document?.id || '',
			title: document?.title,
			templates: [
				...(document?.templates.map(x => x.id) || []),
				sendTemplate.template,
			],
		}).then(res => {
			if (res.ok == true) {
				setModalStatus('check')
				updateTable()
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
			<Select
				field={FieldNames.field}
				placeholder={'Шаблон'}
				name={'template'}
				options={templates}
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
		</FormWithValidate>
	)
}

export { AddExistingTemplateBody }
