import styled from 'styled-components'

export const Textarea = (props) => {
  return (
    <TextareaLable {...props}/>
  )
}
const TextareaLable = styled.textarea`
    margin-left:0px;
    margin-bottom:20px;
    min-height: 31px;
    font-style: italic;
    word-break: break-word;
`