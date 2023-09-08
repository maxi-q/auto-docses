import Templates, {
	ITemplateData,
	ITemplateDataWithValue,
} from '@api/templates'
import { FormWithValidate } from '@components/FormWithValidate'
import { COLORS } from '@constants/style/COLORS'
import { FieldNames } from '@helpers/validator'
import { Button, Input } from '@ui/index'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface IDefaultTemplateWithValues {
	id: string
	template: ITemplateData
	value: string
	category: string
}

const DefaultTemplateValues = () => {
	const [templates, setTemplates] = useState<Array<ITemplateData>>()
	const [values, setValues] = useState<Array<ITemplateDataWithValue>>()
	const [defaultTemplateValues, setDefaultTemplateValues] =
		useState<Array<ITemplateDataWithValue | undefined>>()

	const Template = new Templates()
	const [status, setStatus] = useState<
		'Personal documents' | 'Main information' | 'No official'
	>('Main information')

	useEffect(() => {
		console.log(defaultTemplateValues)
	}, [defaultTemplateValues])

	useEffect(() => {
		Template.getList().then(data => {
			if (data.status == 401) return
			data.json().then((templatesArray: Array<ITemplateData>) => {
				templatesArray = templatesArray
					.sort((a, b) => Number(a.is_official) - Number(b.is_official))
					.reverse()
				setTemplates(templatesArray)
			})
		})

		Template.getValuesList().then(data => {
			data.json().then((templatesArray: Array<ITemplateDataWithValue>) => {
				setValues(templatesArray)
			})
		})
	}, [])

	useEffect(() => {
		setDefaultTemplateValues(
			values &&
				templates?.map((template): IDefaultTemplateWithValues | undefined => {
					const value = values?.find(value => value.template.id == template.id)
					console.log(template)
					if (template.is_official || value?.value) {
						return {
							id: value ? value.id : '',
							template: template,
							value: value ? value.value : '',
							category: template.category,
						}
					}
					return
				})
		)
	}, [values, templates])

	const onSubmit = (data: object) => {
		for (const [template_id, template_value] of Object.entries(data)) {
			if (!template_value) continue
			if (values?.find(x => x.template.id == template_id)) {
				Template.updateValue({
					templateId: templates?.find(x => x.id == template_id)?.id || '',
					value: template_value,
				})
			} else {
				Template.createValue({
					templateId: templates?.find(x => x.id == template_id)?.id || '',
					value: template_value,
				})
			}
		}
	}

	return (
		<TemplateBlock>
			<Header>
				<ClickedLink
					onClick={() => setStatus('Main information')}
					active={status == 'Main information'}
				>
					Личные данные
				</ClickedLink>
				<ClickedLink
					onClick={() => setStatus('Personal documents')}
					active={status == 'Personal documents'}
				>
					Персональные документы
				</ClickedLink>
				<ClickedLink
					onClick={() => setStatus('No official')}
					active={status == 'No official'}
				>
					Твои
				</ClickedLink>
			</Header>
			<FormWithValidate onSubmit={onSubmit}>
				<TemplateValueBlock>
					{defaultTemplateValues &&
						defaultTemplateValues.map((template, i) => {
							if (!template) return

							
							return (
								template &&
								template.template.category == (template.template.is_official ? status : '') && (
									<FeatureInput key={i}>
										<KeyLabel>{template.template.title}:</KeyLabel>
										<Input
											defaultValue={template.value}
											field={
												template.value ? FieldNames.field : FieldNames.mayEmpty
											}
											placeholder={''}
											type='textarea'
											name={template.template.id}
										/>
									</FeatureInput>
								)
							)
						})}
				</TemplateValueBlock>
				{templates && <Button type='submit'>Сохранить изменения</Button>}
			</FormWithValidate>
		</TemplateBlock>
	)
}

export { DefaultTemplateValues }

const TemplateValueBlock = styled.div`
	height: 69vh;
	overflow: auto;
`
const Header = styled.div`
	width: 100%;
	height: 40px;
	color: ${COLORS.gos_blue};
	display: flex;
	gap: 14px;
	flex-direction: row;
`
const TemplateBlock = styled.div`
	display: flex;
	gap: 4px;
	flex-direction: column;
`
const KeyLabel = styled('span')`
	font-size: 1em;
	color: #767676;
`
const FeatureInput = styled.div`
	margin-left: 5px;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: start;
`

const ClickedLink = styled.h6<{ active?: boolean }>`
	cursor: pointer;
	margin: 30px 0;
	height: 24px;
	color: ${p => (p.active ? `${COLORS.gos_black}` : `${COLORS.gos_blue}`)};

	font-size: 16px;
	font-weight: 400;
`