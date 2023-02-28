import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Button, Input } from '@ui';

export const Registration = () => {

  return <>
    <Body>
      <Window>
        Окно регистрации
        <Input placeholder="Почта"></Input>
        <Input placeholder="Пароль"></Input>
        <Input placeholder="Повторить пароль"></Input>
        <Button>Регистрация</Button>
        <Link to="/Auth">Уже зарегестрированы? Вход</Link>
      </Window>
    </Body>
  </>
}

export const Authorization = () => {

  return <>
    <Body>
      <Window>
        Окно авторизации
        <Input placeholder="Почта"></Input>
        <Input placeholder="Пароль"></Input>
        <Button>Авторизация</Button>
        <Link to="/Reg">Еще не зарегестрированы? Регитрация</Link>

      </Window>
    </Body>
  </>
}

const Body = styled.div`
  width: 100wh;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Window = styled.div`
  min-width: 100px;
  min-height:100px;
  width: min-content;
  height: min-content;
  padding: 40px;

  background-color: red;
`
