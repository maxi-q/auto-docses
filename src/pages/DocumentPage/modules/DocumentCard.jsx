import React from 'react'
import styled from 'styled-components'

export const DocumentCard = ({ file }) => {
  return (
    <MCard>
      <CardImage src={file.photo} />
      <CardInfo>
        {file.name}
        <Change>Дата изменения: {file.dateOfChange}</Change>
      </CardInfo>
    </MCard>
  )}

const Change = styled.h4`
  font-size: 12px;
`
const CardImage = styled.img`
  border-radius: 10px 10px 0  0;
  width: 100%;
`
const CardInfo = styled.div`
  height: 60px;
  width: 100%;
  padding: 10px 17px;
  display: flex;
  justify-content: start;
  flex-direction: column;
`

const MCard = styled.div`
  font-family: 'Comfortaa', sans-serif;
  cursor: pointer;
  color: white;
  margin:10px;
  padding: 5px;
  width:250px;
  min-height:100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #198754;

  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19);

 

  transition: all .5s;
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22), 0px -10px 100px -68px rgba(34, 60, 80, 0.25) inset;
  }
`