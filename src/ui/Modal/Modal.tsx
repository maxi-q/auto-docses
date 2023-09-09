import React, { ReactNode } from 'react'
import styled from 'styled-components'

type ModalType = {
	active: boolean
	setActive: React.Dispatch<React.SetStateAction<boolean>>
	children: ReactNode
	onClick?: Function
}

export const Modal = ({
	active,
	setActive,
	children,
	onClick = () => {},
}: ModalType) => {
	const onClickEvent = () => {
		setActive(false)
		onClick()
	}
	document.body.style.overflow = active ? 'hidden' : 'auto'

	return (
		<ModalBG active={active} onClick={onClickEvent}>
			<ModalContent onClick={e => e.stopPropagation()}>
				<ModalHeader>
					<svg
						onClick={onClickEvent}
						xmlns='http://www.w3.org/2000/svg'
            style={{cursor: 'pointer'}}
						width='16'
						height='16'
						fill='currentColor'
						className='bi bi-x-lg'
						viewBox='0 0 16 16'
					>
						<path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z' />
					</svg>
				</ModalHeader>
				{children}
			</ModalContent>
		</ModalBG>
	)
}

const ModalHeader = styled.div`
	width: auto;
	height: 30px;
	display: flex;
	justify-content: end;
	padding: 10px 10px 0 0;
	margin: -20px -20px 0 -20px;
	border-radius: 12px 12px 0 0;
	background: rgb(227, 227, 227);
`
const ModalContent = styled.div`
	padding: 0 20px 20px 20px;
	border-radius: 0 0 12px 12px;
	background: rgb(227, 227, 227);
	pointer-events: all;
`
const ModalBG = styled.div<{ active: boolean }>`
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.4);
	position: fixed;
	display: flex;
	flex-direction: column;
	display: ${props => (props.active ? 'flex' : 'none')};
	align-items: center;
	padding: 6% 0;
	top: 0;
	left: 0;
	overflow: auto;
	pointer-events: ${props => (props.active ? 'all' : 'none')};
	opacity: ${props => (props.active ? 1 : 0)};
`
