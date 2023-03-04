import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button, Input } from '@ui';
import { FormWhisValidate } from './modules/FormWhisValidate';

import { fechDataForRegistration } from '@api/user/fechDataForRegistration';
import { Tseaetr } from '@api/user/fetchDecorator';
export const Registration = () => {
  const onSubmit = data => console.log(data);

  return <>
    <Body>
      <Window>
        <FormWhisValidate onSubmit={onSubmit}>
          <Window.Title>Окно регистрации</Window.Title>

          <Input name="login" placeholder="Логин" validate="login"/>
          <Input name="email" placeholder="Почта" validate="email"/>
          <Input name="password"  type="password" placeholder="Пароль" validate="password"/>
          <Input name="rePassword" type="password" placeholder="Повторить пароль" validate="password"/>

          <Input name="About" type="textarea" placeholder="textarea" />
          <Input name="date" type="date" placeholder="date" />

          <RButton>Авторизация</RButton>
        </FormWhisValidate>
        <Link to="/Auth">Уже зарегестрированы? Вход</Link>
      </Window >
    </Body>
  </>
}

export const Authorization = () => {
  const onSubmit = data => console.log(data);

  return <>
    <Body>
      <Window>
        <FormWhisValidate onSubmit={onSubmit}>
          <Window.Title>Окно авторизации</Window.Title>

          <Input name="login" type="text" placeholder="Логин" validate="login"/>
          <Input name="password" type="password" placeholder="Пароль" validate="password"/>

          <RButton>Авторизация</RButton>
        </FormWhisValidate>
        <Link to="/Reg">Еще не зарегестрированы? Регистрация</Link>
      </Window >
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

const Window = styled(Card)`
  min-width: 300px;
  min-height:100px;
  width: min-content;
  height: min-content;
  padding: 40px;
  gap: 10px;
`
const RButton = styled(Button)`
  width: 150px;
  margin-left: auto;
`