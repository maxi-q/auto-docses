import React, { ReactNode } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'

type EnrichedChildrenType = {
	onChange(): void
	selectedValue: string
	name: string
	children?: React.ReactNode
}

type FormType = {
	defaultValues?: Object
	children?: ReactNode | null
	onSubmit: SubmitHandler<Object>
}
const FormWithValidate = ({ defaultValues, children, onSubmit }: FormType) => {
	const methods = useForm({ defaultValues })
	const {
		handleSubmit,
		formState: { errors },
	} = methods

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{React.Children.map(children, child => {
					if (!React.isValidElement<EnrichedChildrenType>(child)) {
						return child
					}
					return React.createElement(child.type, {
						...{
							...child.props,
							register: methods.register,
							key: child.props.name,
							errors: errors,
						},
					})
				})}
			</Form>
		</FormProvider>
	)
}

export { FormWithValidate }

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 15px;
`
