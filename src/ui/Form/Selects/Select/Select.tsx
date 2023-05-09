import { useEffect, useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import { FieldNames } from 'src/helpers/validator'
import { InputBox } from '../components/InputBox'

interface ISelectOptions {
	label: number | string
	value: string
}

type SelectType = {
	defaultValue?: string
	errors?: FieldErrors
	placeholder: string
	name: string
	field: FieldNames
	options: Array<ISelectOptions>
}

export const Select = ({
	defaultValue,
	errors,
	name,
	field,
	placeholder,
	options,
}: SelectType) => {
	const [value, setValue] = useState(defaultValue ? defaultValue : 0)
	const [haveValue, setHaveValue] = useState(false)

	useEffect(() => {
		setHaveValue(Boolean(value))
	}, [value])

	const onChange = (object: HTMLInputElement) => {
		setValue(object.value)
	}

	return (
		<>
			<InputBox
				placeholder={placeholder}
				name={name}
				field={field}
				options={options}
				value={value}
				onChange={onChange}
				focusVisible={haveValue}
				errors={errors}
			/>
		</>
	)
}
