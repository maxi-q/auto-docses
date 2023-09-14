import { MouseEventHandler, ReactNode } from 'react'
import styled from 'styled-components'

import { COLORS } from '../../constants/style/COLORS'

type ButtonType = {
	children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
	type?: "button" | "submit" | "reset" | undefined
}

export const RedButton = ({ children, onClick, type, ...props }: ButtonType) => {
	return <SButton onClick={onClick} type={type} {...props}>{children}</SButton>
}

const SButton = styled.button`
	display: block;
	padding: 0.25em 1em;

	background-color: ${COLORS.red500};
	color: white;

	cursor: pointer;
	font-size: 1.08em;

	border: 2px solid ${COLORS.red500};
	border-radius: 5px;
	box-shadow: 2px 2px 4px 0px rgba(34, 60, 80, 0.3);

	transition: all 0.15s linear;

	&:hover {
		color: ${COLORS.gray100};
		background-color: ${COLORS.red_bs};
		border-color: ${COLORS.red600};
		box-shadow: 3px 1px 6px 2px rgba(34, 60, 80, 0.45);
	}
`
