import { useEffect, useState } from 'react'
import { FieldErrors, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
// @constants/style/COLORS
import { COLORS } from '../../../constants/style/COLORS'

import validator, { FieldNames, IRegexFabric, regexFabric } from '../../../helpers/validator'
import { useKeyPress } from '../../../hooks/useKeyPress'
import { PlaceholderMod } from '../../../ui/PlaceholderMod'

type InputType = {
	defaultValue?: string
	errors?: FieldErrors
	placeholder: string
	name: string
	field: FieldNames
	validationParams?: IRegexFabric
	type?: string
	adminValue?: string
	accept?: string
	className?: string
	label?: string
}

export const Input = ({
	defaultValue,
	adminValue,
	errors,
	name,
	field,
	validationParams,
	type,
	placeholder,
	className,
	label,
	...props
}: InputType) => {
	const [value, setValue] = useState(defaultValue ? defaultValue : '')
	const [haveValue, setHaveValue] = useState(
		type === 'date' || type === 'time' ? true : false
	)

	useEffect(() => {
		setValue(defaultValue ? defaultValue : '')
	}, [defaultValue])

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

	const validation = validationParams ? regexFabric(validationParams) : validator[field]

	return (
		<div className={className}>
			<InputBox>
				{/* Now without textarea type  */}
				<InputForm
					className={'form-control ' + (errors?.[name] ? 'is-invalid' : '')}
					style={{marginBottom: '0'}}
					value={value}
					{...register(name, {
						...validation,
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
		</div>
	)
}

export const ErrorInput = styled.span`
	margin: 0 0 0 10px;
	white-space: pre-line;

	font-size: 0.875em;
	color: #dc3545;
`
const InputBox = styled.div`
	position: relative;
	margin-top: 0px;
`
const ClassFromInputs = `
  // display: block;
  // background-color: ${COLORS.gray400};

  // width:100%;
  // padding: 3px 20px;
  
  // border: 2px solid ${COLORS.gray400};
  // border-radius: 5px;
  // border-width: 0px;
  

  // font-size: 1.08em;
  // cursor: pointer;

  // transition: all .1s linear;

  // color: ${COLORS.gray900};
  
  // &::-webkit-input-placeholder {
  //   color: ${COLORS.gray900};
  // }
  // &:focus {
  //   outline: none;
  //   padding-bottom: 8px;
  //   padding-top: 5px;
  //   background-color: ${COLORS.gray500};
  //   border-color: ${COLORS.gray500};
  // }
  // &:hover {
  //   background-color: ${COLORS.gray800};
  //   border-color: ${COLORS.gray800};
  //   color: ${COLORS.gray100};  
  //   &::-webkit-input-placeholder {
  //     color: ${COLORS.gray100};
  //   }
  // }
`
const InputForm = styled.input`
	${ClassFromInputs}
`
