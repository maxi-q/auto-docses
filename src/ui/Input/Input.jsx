import React from 'react'
import styled from 'styled-components'

export const Input = ({children, ...props}) => {
  return(
    <InputForm {...props}>{children}</InputForm>
  )
}
const InputForm = styled.input`
  background-color: #4990CD;
  cursor: pointer;
  display: block;
  padding: 20px;
  padding-bottom: 3px;
  padding-top: 3px;
  border-radius: 5px;
  border-width: 0px;
  color: white;
  font-size: 1.08em;
  margin-top: 0px;
  margin-left: auto;
  border: 2px solid #4990CD;
`