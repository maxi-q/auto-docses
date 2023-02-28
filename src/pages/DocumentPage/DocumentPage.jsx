import React from 'react'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card';
import { Outlet } from "react-router-dom"

import { Button } from '@ui';
import { getAllfiles } from '@api/documents/'
import photo from '@assets/images/document.png'
import { DocumentCard } from './modules/DocumentCard';

const Cards = (props) => {
  console.log(props.files[0])
  return <>
    { 
      props.files.map((file, id) => (
        <DocumentCard file={file} key={id}/>
      ))  
    }
  </>
}

//   <Card style={{ width: '15rem', backgroundColor: 'rgb(190, 190, 190)', margin:'5px' }}>
//   <Card.Img variant="top" src={file.photo} />
//   <Card.Body>
//     <Card.Title>{file.name}</Card.Title>
//     <Card.Text>
//     Дата изменения: {file.dateOfChange}
//     </Card.Text>
//     {/* <Button variant="primary">Go somewhere</Button> */}
//   </Card.Body>
// </Card>

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

export const DocumentPage = () => {
  const files = getAllfiles()
  console.log(files)
  files[0].photo = photo
  files[1].photo = photo
  return <> 
    <Button>Добавить документ</Button>
    <Disc>
      <Cards files={files}/>
    </Disc>
    <Outlet/>
  </>
}

const Disc = styled.div`
  flex-grow: 1;
  display: flex;
  padding: 0 0 50px 0;
  background-color: rgb(240,240,240);
  width: 80%;
  flex-wrap: wrap;
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