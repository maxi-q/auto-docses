import React from 'react'
import styled from 'styled-components'

import { Card } from '@ui'



export const Main = () => {
  return (
    <>
      <Body>
        <MainCard>
          <Title>
            Автоматическое заполнение документов
          </Title>
          <SubCard>
            321
          </SubCard>
        <Split/>
          <Text>
          321
          </Text>
        </MainCard>
      </Body>
    </>
  )
}
const Title = styled.h1`
  font-size: 20px;
`
const Text = styled.p`

`
const MainCard = styled(Card)`
  min-width: 250px;
  width: 700px;
  padding: 20px;
  height: 500px;
`
const SubCard = styled(Card)`
  background-color: rgb(0,0,0, 0.01);
`
const Split = styled.div`
  background-color: rgb(0,0,0, 0.4);
  height: 3px;
  margin: 20px -20px;
`
const Body = styled.div`
  padding: 20px 0 0 0;
  background-color: transparent;
  min-height: 500px;
  display:flex;
  justify-content: center;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`