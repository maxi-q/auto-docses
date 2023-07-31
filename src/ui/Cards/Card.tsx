import { ReactNode } from 'react'
import styled from 'styled-components'

type CardType = {
	className?: string
	children: ReactNode
}

export const Card = ({ className, children }: CardType) => {
	return <CardCanvas className={className}>{children}</CardCanvas>
}

const CardCanvas = styled.div`
	width: min-content;
	min-width: 100px;
	height: min-content;
	min-height: 80px;
	padding: 10px;

	border-radius: 12px;
	background-color: rgb(240, 240, 240);
	box-shadow: 2px 2px 4px 0px rgba(34, 60, 80, 0.3);
`
