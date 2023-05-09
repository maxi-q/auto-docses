import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CaretRightFill, Clock, Folder, Person } from 'react-bootstrap-icons';

type HideButtonType = {
  children: ReactNode
  folder?: boolean
  active?: boolean
}

export const HideButton = ({folder = false, children, active = false ,...props}: HideButtonType) => {
  return(
    <SButton active={active} >{ folder ? <CaretRightFill /> : <NoArrow /> } {children}</SButton>
  )
}

const SButton = styled.button<{active: boolean}>`
  display: flex;
  width: 80%;

  background-color:  ${props => props.active ? "rgba(232,240,254, .9)": "transparent"};
  color: ${props => props.active ? "rgb(24,90,188)": "#003153"};
  font-size: 1em;

  padding:  6px 0 6px 3px;
  margin: 0 -5px;

  border: none;
  border-radius: 0 5px 5px 0;
  
  text-align: start;
  justify-content: start;
  align-items:center;
  
  transition: all .2s;

  & > * {
    margin: 0 5px;
  }

  ${props => props.active ? "": "&:hover {background-color: rgba(0,0,0,0.1);}"}
  
`
const NoArrow = styled.div`
  width: 16px;
`