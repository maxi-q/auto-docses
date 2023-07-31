import { useEffect, useState } from 'react'
import { FieldErrors, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
// @constants/style/COLORS
import { COLORS } from '../../../constants/style/COLORS'

import validator, { FieldNames } from '../../../helpers/validator'
import { useKeyPress } from '../../../hooks/useKeyPress'
import { PlaceholderMod } from '../../../ui/PlaceholderMod'

type InputType = {
	defaultValue?: string
	errors?: FieldErrors
	placeholder: string
	name: string
	field: FieldNames
	type?: string
	adminValue?: string
}
type indefiniteInputType = {
	type: string
	props: any[]
}

export const Input = ({
	defaultValue,
	adminValue,
	errors,
	name,
	field,
	type,
	placeholder,
	...props
}: InputType) => {
	const [value, setValue] = useState(defaultValue ? defaultValue : '')
	const [haveValue, setHaveValue] = useState(
		type === 'date' || type === 'time' ? true : false
	)

	const onKeyPress = (event: KeyboardEvent) => {
		if (event.altKey && event.ctrlKey) {
			setValue(adminValue ? adminValue : '')
		}
	}
	useKeyPress(['a'], onKeyPress)

	const onChange = (object: HTMLInputElement) => {
		setValue(object.value)
	}

	useEffect(() => {
		if (type != 'date' && type != 'time') {
			setHaveValue(Boolean(value))
		}
	}, [value])

	const { register } = useFormContext()

	return (
		<>
			<InputBox>
				{/* Now, without textarea type  */}
				<InputForm
					value={value}
					{...register(name, {
						...validator[field],
						onChange: e => {
							onChange(e.target)
						},
					})}
					placeholder={placeholder}
					type={type}
					{...props}
				/>
				{placeholder && (
					<PlaceholderMod focusVisible={haveValue}>
						{placeholder}
					</PlaceholderMod>
				)}
			</InputBox>
			{errors?.[name] && (
				<ErrorInput children={errors?.[name]?.message?.toString()} />
			)}
		</>
	)
}

const ErrorInput = styled.span`
	font-size: 16px;
	margin: -10px 0 -5px 10px;
	color: red;
`
const InputBox = styled.div`
	position: relative;
	margin-top: 0px;
`
const ClassFromInputs = `
  display: block;
  background-color: ${COLORS.gray200};

  width:100%;
  padding: 3px 20px;
  
  border: 2px solid ${COLORS.gray200};
  border-radius: 5px;
  border-width: 0px;
  

  font-size: 1.08em;
  cursor: pointer;

  transition: all .1s linear;

  color: ${COLORS.gray900};
  
  &::-webkit-input-placeholder {
    color: ${COLORS.gray900};
  }
  &:focus {
    outline: none;
    padding-bottom: 8px;
    padding-top: 5px;
    background-color: ${COLORS.gray500};
    border-color: ${COLORS.gray500};
  }
  &:hover {
    background-color: ${COLORS.gray800};
    border-color: ${COLORS.gray800};
    color: ${COLORS.gray100};  
    &::-webkit-input-placeholder {
      color: ${COLORS.gray100};
    }
  }
`
const InputForm = styled.input`
	${ClassFromInputs}
`
const TextAreaForm = styled.textarea`
	${ClassFromInputs}
	resize: vertical;
	min-height: 38px;
	max-height: 200px;

	transition: none;
	transition-property: border-color, background-color, padding-top,
		padding-bottom;
	transition-duration: 0.1s;
`
