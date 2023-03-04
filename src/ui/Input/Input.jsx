import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import handler from '@helpers/handlerForObject'
import validateWorkers from './validateWork'

export const Input = ({ register = (a) => (a), errors, name, validate, ...props }) => {
  const [value, setValue] = useState('')
  const [focusVisible, setFocusVisible]  = useState(props.type == 'date' ? true : false)

  let InputInForm = InputForm
  if(props.type == 'textarea') {
    InputInForm = IextAreaForm
  }

  const onChange = (object) => {
    setValue(object.value)
  }

  useEffect(() => {
    if(props.type !== 'date') { 
      setFocusVisible(Boolean(value))
     }
  }, [ value ]);

  return(<>
    <InputBox>
      <InputInForm
        onChange={ (e) => {setValue(e.target.value)} }
        value={value}
        {...register(name, {
          ...validateWorkers[validate],
          onChange: (e) => { onChange(e.target) }
        })} 
        {...props} 
      />
      { props?.placeholder && <PlaceholderMod focusVisible={focusVisible}>{props.placeholder}</PlaceholderMod>}
    </InputBox>
    { errors?.[name] && <ErrorInput name="placeholder">{errors?.[name].message}</ErrorInput>}
  </>
)
}

const PlaceholderMod = styled.div`
  transition: all .3s linear;
  max-width: ${props => props.focusVisible ? "200px": "0"};
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
  font-size: 13px;
  padding: 0  ${props => props.focusVisible ? "4px": "0"};
  color: white;
  background-color: #4990CD;
  border-radius: 3px;
  z-index: 1;
  top: -12px;
  left: 5px;

`
const ErrorInput = styled.span`
  font-size: 16px;
  margin: -10px 0 -10px 10px
`
const InputBox = styled.div`
  position: relative;
  margin-top: 0px;
`

const ClassFromInputs = `
  width:100%;
  background-color: #4990CD;
  cursor: pointer;
  display: block;
  padding: 20px;
  padding-bottom: 3px;
  padding-top: 3px;
  border-radius: 5px;
  border-width: 0px;
  color: white;
  & > *: {
    color: white;
  }
  font-size: 1.08em;
  
  border: 2px solid #4990CD;
  transition: all .1s linear;

  &::-webkit-input-placeholder {
    color: white;
  }
  &:hover {
    background-color: #4e7dc5;
    border-color: #4e7dc5;
  }
  &:focus-visible {
    outline: none;
    padding-bottom: 8px;
    padding-top: 5px;
    background-color: #2f5b9d;
    border-color: #2f5b9d;
  }
`
const InputForm = styled.input` ${ClassFromInputs} `
const IextAreaForm = styled.textarea` 
  ${ClassFromInputs} 
  resize: vertical;
  min-height: 38px;
  max-height: 200px;

  transition: none;
  transition-property: border-color, background-color, padding-top, padding-bottom;
  transition-duration: .1s;
`