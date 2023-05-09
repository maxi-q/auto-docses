import React, { useState } from 'react'
import styled from 'styled-components'
import {Link, BrowserRouter } from 'react-router-dom'

import { Navigation } from './pages'
import { Header } from './modules'
import { Footer } from './modules'



export function App() {
  const [background, setBackground] = useState('');
  return (
    <BrowserRouter>
      < DeveloperNav>
        <Link to="/Home" style={{marginLeft: '20px'}}> MainWindow </Link> |{' '}
        <Link to="/LoadPage"> LoadPage </Link> |{' '}
        <Link to="/Profile"> Profile </Link> |{' '}
        <Link to="/document"> document </Link> |{' '}
        <Link to="/Auth"> Авторизация </Link> |{' '}
        
      </DeveloperNav> 
      <Header/>
      <MainStyled background={background}>
        <Navigation />
      </MainStyled>
      <Footer/>
    </BrowserRouter>
  )
}

const DeveloperNav = styled('nav')`
  border-bottom: solid 1px;
  padding-bottom: .5rem;
  margin-bottom: 0px;
`
const MainStyled = styled.div<{ background: string }>`
  background-color: ${ props => props.background };
  min-height: 1000px;
  flex: 1 0 auto;
`