import Templates, {
	ITemplateData,
	ITemplateDataWithValue,
} from '@api/templates'
import { FormWithValidate } from '@components/FormWithValidate'
import { FieldNames } from '@helpers/validator'
import { Button, Input } from '@ui/index'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface IDefaultTemplateWithValues {
	id: string
	template: ITemplateData
	value: string
}

const DefaultTemplateValues = () => {
	const [templates, setTemplates] = useState<Array<ITemplateData>>()
	const [values, setValues] = useState<Array<ITemplateDataWithValue>>()
	const [defaultTemplateValues, setDefaultTemplateValues] =
		useState<Array<ITemplateDataWithValue | undefined>>()

	const Template = new Templates()

	useEffect(() => {
		Template.getList().then(data => {
			if(data.status == 401) return
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

					if(template.is_official || value?.value) {
						return {
							id: value ? value.id : '',
							template: template,
							value: value ? value.value : '',
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
			<FormWithValidate onSubmit={onSubmit}>
				<TemplateValueBlock>
					{defaultTemplateValues &&
						defaultTemplateValues.map(
							(template, i) =>
								template && (
									<FeatureInput key={i}>
										<KeyLabel>{template.template.title}:</KeyLabel>
										<Input
											defaultValue={template.value}
											field={template.value ? FieldNames.field : FieldNames.mayEmpty}
											placeholder={''}
											type='textarea'
											name={template.template.id}
										/>
									</FeatureInput>
								)
						)}
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