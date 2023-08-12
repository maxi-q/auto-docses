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
				templates?.map(template => {
					const value = values?.find(value => value.template.id == template.id)

					if (!(value?.template.is_official || value?.value)) return

					return {
						id: value ? value.id : '',
						template: template,
						value: value ? value.value : '',
					}
				})
		)
	}, [values, templates])

	const onSubmit = (data: object) => {
		for (const [key, value] of Object.entries(data)) {
			if (!value) continue
			if (values?.find(x => x.template.title == key)) {
				Template.updateValue({
					title: key,
					template: templates?.find(x => x.title == key)?.id || '',
					value: value,
				})
			} else {
				Template.createValue({
					template: templates?.find(x => x.title == key)?.id || '',
					value: value,
				})
			}
		}
	}

	return (
		<FormWithValidate onSubmit={onSubmit}>
			{defaultTemplateValues &&
				defaultTemplateValues.map((t, i) => t && (
					<FeatureInput key={i}>
						<KeyLabel>{t.template.title}:</KeyLabel>
						<Input
							defaultValue={t.value}
							field={t.value ? FieldNames.field : FieldNames.mayEmpty}
							placeholder={''}
							type='textarea'
							name={t.template.title}
						/>
					</FeatureInput>
				))}
			{templates && <Button type='submit'>Сохранить изменения</Button>}
		</FormWithValidate>
	)
}

export { DefaultTemplateValues }

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
