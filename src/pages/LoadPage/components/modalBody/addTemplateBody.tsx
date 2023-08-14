import Documents, { IDocumentPackageData, IOneDocumentData, TemplateInDocumentType } from '@api/documents'
import Templates, { ITemplateData } from '@api/templates'
import { FormWithValidate } from '@components/FormWithValidate'
import { FieldNames } from '@helpers/validator'
import { ISelectOptions } from '@ui/Form/Selects/LotsSelect'
import { Button, Input, Modal } from '@ui/index'
import { useContext, useEffect, useState } from 'react'
import { lotsSelectToArray } from '../../helpers/lotsSelectToArray'

interface IModalAddTemplate {
	document: IOneDocumentData
	addTemplate: Function
	setModalStatus: React.Dispatch<
		React.SetStateAction<'check' | 'update' | 'delete' | 'add'>
	>
	updateTable: Function
	template: TemplateInDocumentType
}

const AddTemplateBody = ({
	document,
	addTemplate,
	setModalStatus,
	updateTable,
	template
}: IModalAddTemplate) => {

	const TemplatesManager = new Templates()
	const DocumentManager = new Documents()


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
					.then(res => {
						if(res.ok == true) {
							addTemplate({
								name_in_document:
								data.title,
								title: data.title,
								id: data.id,
								value: '',
							})
							setModalStatus('check')
							updateTable()
						}
						else {
							console.log(res.json().then(err => {
								console.log(err)
							}))
						}
					})
				})
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
					field={FieldNames.mayEmpty}
					placeholder={'Имя в документе'}
					type='textarea'
					name={'name_in_document'}
				/>

				<Button type='submit'>Добавить шаблон</Button>
			</FormWithValidate>
	)
}

export { AddTemplateBody }
