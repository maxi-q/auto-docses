import Documents, {
	IOneDocumentData,
	TemplateInDocumentType,
} from '@api/documents'
import Templates from '@api/templates'
import { FormWithValidate } from '@components/FormWithValidate'
import { FieldNames } from '@helpers/validator'
import { Button, Input } from '@ui/index'
import { lotsSelectToArray } from '../../helpers/lotsSelectToArray'

interface IUpdateTemplateBody {
	document: IOneDocumentData
	addTemplate: Function
	setModalStatus: React.Dispatch<
		React.SetStateAction<'check' | 'update' | 'delete' | 'add'>
	>
	updateTable: Function
	template: TemplateInDocumentType
}

const UpdateTemplateBody = ({
	document,
	addTemplate,
	setModalStatus,
	updateTable,
	template,
}: IUpdateTemplateBody) => {
	const TemplatesManager = new Templates()
	const DocumentManager = new Documents()
	
	const onSubmit = (data: object) => {
		// Здесь все работает!
		const sendTemplate: any = lotsSelectToArray(data)

		TemplatesManager.update({
			id: template.id,
			title: sendTemplate.title,
			description: sendTemplate.description,
			nameInDocument: sendTemplate.name_in_document,
		}).then(res => {
			console.log(res)
			res.json().then(data => {
				console.log(data)
			})
			if(res.status == 200) {
				setModalStatus('check')
				updateTable()
			}
		})
		// Здесь все работает!
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

			<Button type='submit'>Изменить шаблон</Button>
		</FormWithValidate>
	)
}

export { UpdateTemplateBody }
