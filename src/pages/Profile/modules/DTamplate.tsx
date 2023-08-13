import Templates, {
	ITemplateData,
	ITemplateDataWithValue,
} from '@api/templates'
import { FormWithValidate } from '@components/FormWithValidate'
import { FieldNames } from '@helpers/validator'
import { Button, Input } from '@ui/index'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const DefaultTemplateValues = () => {
	const [templates, setTemplates] = useState<Array<ITemplateData>>()
	const [values, setValues] = useState<Array<ITemplateDataWithValue>>()
	const [defaultTemplateValues, setDefaultTemplateValues] =
		useState<Array<ITemplateDataWithValue | undefined>>()

	const Template = new Templates()

	useEffect(() => {
		Template.getList().then(data => {
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
				templates?.map((template): { id: string; template: ITemplateData; value: string } | undefined => {
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
		console.log(data)
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
							(t, i) =>
								t && (
									<FeatureInput key={i}>
										<KeyLabel>{t.template.title}:</KeyLabel>
										<Input
											defaultValue={t.value}
											field={t.value ? FieldNames.field : FieldNames.mayEmpty}
											placeholder={''}
											type='textarea'
											name={t.template.id}
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
	max-height: 400px;
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
