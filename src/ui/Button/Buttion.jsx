import React from 'react'
import styled from 'styled-components'

export const Button = ({children ,...props}) => {
  return(
    <SButton { ...props } >{children}</SButton>
  )
}

const SButton = styled.button`

  display: block;
  padding: 0.25em 1em;
  
  background-color: #4990CD;
  color: white;
  
  cursor: pointer;
  font-size: 1.08em;
  
  border: 2px solid #4990CD;
  border-radius: 5px;
  box-shadow: 2px 2px 4px 0px rgba(34, 60, 80, 0.3);

  transition: all .1s linear;

  &:hover {
    color: rgb(220,220,220);
    background-color: #336c9d;
    border-color: #336c9d;
    box-shadow: 6px 3px 13px 4px rgba(34, 60, 80, 0.45);
  }
`