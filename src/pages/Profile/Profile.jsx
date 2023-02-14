import React from 'react'
import styled from 'styled-components'


const Cards = ({files = [1,2,3]}) => {
    console.log(files)
    const html = files.map((file, id) => (
        <Card key={id}>{file}</Card>
    ))
    return html
}   

export const Profile = () => {
  return (
    <Body>
      <RightBlock>
        Профиль<br/>Имя Фамилия
      </RightBlock>
      <LeftBlock>
        <Cards />
      </LeftBlock>
    </Body>
  )
}

const Body = styled.div`
  padding: 20px 0 0 0;
  background-color: transparent;
  min-height: 500px;
  display:flex;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`
const LeftBlock = styled.div`
  flex-grow: 1;
  display: flex;
  background-color: #6495ED;
  width: 80%;
  flex-wrap: wrap;

`
const RightBlock = styled.div`
  padding: .5rem;
  width: 20%;
  flex-shrink: 1;
  background-color: #EE2C2C;
`
const Card = styled.div`
    margin:10px;
    width:100px;
    height:180px;
    background-color: #EE2C2C;
`