import styled from 'styled-components'

export const Button = ({children ,...props}) => {
  return(
    <SButton { ...props } >{children}</SButton>
  )
}

const SButton = styled.button`
  display: inline-block;
  color: #003153;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #42AAFF;
  border-radius: 3px;
  display: block;
`