import React, { MouseEventHandler, ReactNode } from 'react'
import styled from 'styled-components'

type ModalType = {
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  children: ReactNode
  onClick?: Function
}

export const Modal = ({active, setActive, children, onClick = () => {}}: ModalType) => {
  return (
    <ModalBG active={active} onClick={() => {setActive(false); onClick()}}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalBG>
  )
}

const ModalContent = styled.div`
  padding: 20px;
  border-radius: 12px;
  background: rgb(227, 227, 227);
  pointer-events: all;
`
const ModalBG = styled.div<{active: boolean}>`
  height: 100vh;
  width: 100vw;
  background: rgba(0,0,0,0.4);
  position: fixed;
  display: ${props => props.active ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  pointer-events: ${props => props.active ? 'all' : 'none'};
]
  transition: 0.5s;
  opacity: ${props => props.active ? 1 : 0};
`