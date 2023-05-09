import { MouseEventHandler, useState } from 'react'
import { FieldErrors, useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { Button } from '../../../Button'

import { FieldNames } from 'src/helpers/validator'
import { InputBox } from '../components/InputBox'
import Plus from './ui/Plus'
import { Minus } from './ui/Minus'

interface ISelectOptions {
	label: number | string
	value: string
}

type LotsSelectType = {
	value?: Array<string>
	errors?: FieldErrors
	placeholder: string
	name: string
	field: FieldNames
	options: Array<ISelectOptions>
}

export const LotsSelect = ({
	value,
	errors,
	name,
	field,
	placeholder,
	options,
}: LotsSelectType) => {
	const [arr, setArr] = useState(value ? value : [''])

	const onChange = (object: HTMLInputElement, index: number) => {
		console.log(object, index)
		const temp = [...arr]
		temp[index] = object.value
		setArr(temp)
	}

	const { unregister } = useFormContext()

	const removeInput:MouseEventHandler = (e) => {
		e.preventDefault()
		unregister(`${name}-${arr.length - 1}`)
		setArr(s => {
			s.pop()
			return [...s]
		})
	}

	const addInput:MouseEventHandler = (e) => {
		e.preventDefault()
		setArr(s => {
			return [...s, '']
		})
	}

	return (
		<>
			{arr.map((value, i) => {
				const focusVisible = Boolean(arr[i])
				const selectName = `${name}-${i}`
				return (
					<>
						<InputBox
							placeholder={placeholder}
							name={selectName}
							field={field}
							options={options}
							value={value}
							onChange={onChange}
							focusVisible={focusVisible}
							errors={errors}
							i={i}
						/>
					</>
				)
			})}
			<ButtonGroup>
				<EventButton onClick={addInput}>
					<Plus />
				</EventButton>
				<EventButton onClick={removeInput}>
					<Minus />
				</EventButton>
			</ButtonGroup>
		</>
	)
}

const EventButton = styled(Button)`
	width: 36px;
	height: 36px;
	padding: 0;
	border-radius: 50%;
	margin-top: 3px;
`
const ButtonGroup = styled.div`
	display: flex;
	align-items: end;
	justify-content: end;
`
