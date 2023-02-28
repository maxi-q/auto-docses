import React from 'react'
import styled from 'styled-components'

import { JumpWord, Welcome } from '@components'



export const Main = () => {
  return (
    <>
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
      <svg width={'220px'} height={'300px'} viewBox={'-120 -100 250 200'}>
          <g transform='rotate(0)'>
            <polygon points={'0,0 0,-120 -35,-60'} fill={'#E49B0F'}/>
            <polygon points={'0,0 0,-120 35,-60'} fill={'#EFD334'}/>
          </g>
          <g transform='rotate(60)'>
            <polygon points={'0,0 0,-120 -35,-60'} fill={'#E49B0F'}/>
            <polygon points={'0,0 0,-120 35,-60'} fill={'#EFD334'}/>
          </g>
          <g transform='rotate(120)'>
            <polygon points={'0,0 0,-120 -35,-60'} fill={'#E49B0F'}/>
            <polygon points={'0,0 0,-120 35,-60'} fill={'#EFD334'}/>
          </g>
          <g transform='rotate(180)'>
            <polygon points={'0,0 0,-120 -35,-60'} fill={'#E49B0F'}/>
            <polygon points={'0,0 0,-120 35,-60'} fill={'#EFD334'}/>
          </g>
          <g transform='rotate(240)'>
            <polygon points={'0,0 0,-120 -35,-60'} fill={'#E49B0F'}/>
            <polygon points={'0,0 0,-120 35,-60'} fill={'#EFD334'}/>
          </g>
          <g transform='rotate(300)'>
            <polygon points={'0,0 0,-120 -35,-60'} fill={'#E49B0F'}/>
            <polygon points={'0,0 0,-120 35,-60'} fill={'#EFD334'}/>
          </g>
      </svg>
    </>
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