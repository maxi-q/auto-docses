import React from 'react'
import styled from 'styled-components'

import { JumpWord, Welcome } from '@components'



export const Main = () => {
  return (
    <Body>
      <LeftBlock>
        <JumpWord />
      </LeftBlock>
      <RightBlock>
        <Welcome buttontext={'Открыть модальное окно'}>
          Modal`s childrens
        </Welcome>
      </RightBlock>
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
`

const RightBlock = styled.div`
  padding: .5rem;
  width: 25%;
  flex-shrink: 1;
  background-color: #EE2C2C;
`