import { MouseEventHandler, ReactNode } from 'react'
import styled from 'styled-components'

import { COLORS } from '../../constants/style/COLORS'

type ButtonType = {
	children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ children, onClick, ...props }: ButtonType) => {
	return <SButton onClick={onClick} {...props}>{children}</SButton>
}

const SButton = styled.button`
	display: block;
	padding: 0.25em 1em;

	background-color: ${COLORS.gray400};
	color: ${COLORS.gray900};

	cursor: pointer;
	font-size: 1.08em;

	border: 2px solid ${COLORS.gray400};
	border-radius: 5px;
	box-shadow: 2px 2px 4px 0px rgba(34, 60, 80, 0.3);

	transition: all 0.15s linear;

	&:hover {
		color: ${COLORS.gray100};
		background-color: ${COLORS.gray800};
		border-color: ${COLORS.gray800};
		box-shadow: 6px 3px 13px 4px rgba(34, 60, 80, 0.45);
	}
`
