import { FieldErrors, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import validator, { FieldNames } from '../../../../helpers/validator'
import { PlaceholderMod } from '../../../../ui/PlaceholderMod'
import { ClassFromInputs } from './StyledSelect'

interface ISelectOptions {
	label: number | string
	value: string
}

type InputBoxType = {
	defaultValue?: string
	errors: FieldErrors | undefined
	placeholder: string
	name: string
	field: FieldNames
	options: Array<ISelectOptions>
	value: string | number
	onChange: Function
	i?: number
	focusVisible: boolean
}

export const InputBox = ({
	errors,
	name,
	field,
	placeholder,
	value,
	onChange,
	focusVisible,
	...props
}: InputBoxType) => {
	const { register } = useFormContext()

	return (
		<>
			<InputBoxStyled>
				<ClassFromInputs
					value={value}
					{...register(name, {
						...validator[field],
						onChange: e => {
							onChange(e.target, props.i)
						},
					})}
					{...props}
				>
					<option value=''>{placeholder}</option>

					{props.options.map((option, i) => (
						<option key={i} value={option.value}>
							{option.label}
						</option>
					))}
				</ClassFromInputs>
				{placeholder && (
					<PlaceholderMod focusVisible={focusVisible}>
						{placeholder}
					</PlaceholderMod>
				)}
			</InputBoxStyled>
			{errors?.[name] && (
				<ErrorInput children={errors?.[name]?.message?.toString()} />
			)}
		</>
	)
}

const ErrorInput = styled.span`
	font-size: 16px;
	margin: -10px 0 -10px 10px;
	color: red;
`
const InputBoxStyled = styled.div`
	position: relative;
	margin-top: 0px;
`
