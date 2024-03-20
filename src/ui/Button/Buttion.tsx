import { MouseEventHandler, ReactNode, TouchEventHandler } from 'react'
import styled from 'styled-components'

import { COLORS } from '../../constants/style/COLORS'

type ButtonType = {
	children: ReactNode
	onClick?: MouseEventHandler<HTMLButtonElement>
	type?: 'button' | 'submit' | 'reset' | undefined
}

export const Button = ({ children, onClick, type, ...props }: ButtonType) => {
	return (
		<SButton onClick={onClick} type={type} {...props}>
			{children}
		</SButton>
	)
}

const SButton = styled.button`
	display: block;
	padding: 0.25em 1em;

	background-color: ${COLORS.blue500};
	color: white;

	cursor: pointer;
	font-size: 1.08em;

	border: 2px solid ${COLORS.blue500};
	border-radius: 5px;
	box-shadow: 2px 2px 4px 0px rgba(34, 60, 80, 0.3);

	transition: all 0.15s linear;

	&:hover {
		color: ${COLORS.gray100};
		background-color: ${COLORS.blue600};
		border-color: ${COLORS.blue600};
		box-shadow: 3px 1px 6px 2px rgba(34, 60, 80, 0.45);
	}
`
