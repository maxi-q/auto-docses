import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'

import { Button, Input } from '@ui';

export const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
      setPassword(e.target.value);
  };
  const rePasswordHandler = (e) => {
      setRePassword(e.target.value);
  };
  useEffect(() => {
    console.log(email, password, rePassword)
}, [password]);

const regProfile = async () => {
    console.log({
      'name': email,
      'password': password
    })
  const options = {
    method: "POST",
    headers: new Headers({
        'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
        'email': 'maxim@gmail.com',
        'username': email,
        'password': password
    })
  };
  fetch('http://192.168.220.174:8000/api/v1/jwt/create/', options)
  .then((json) => {
      console.log(json.status)
      json.json().then(ds=>console.log(ds))
  })
  .catch((err) => {
      console.log(err)
  })
    
}

  return <>
    <Body>
      <Window>
      <Window.Title>Окно регистрации</Window.Title>
        <Input onChange={emailHandler} placeholder="Почта"></Input>
        <Input onChange={passwordHandler} type="password" placeholder="Пароль"></Input>
        <Input onChange={rePasswordHandler} type="password" placeholder="Повторить пароль"></Input>
        <RButton onClick={regProfile}>Регистрация</RButton>
        <Link to="/Auth">Уже зарегестрированы? Вход</Link>
      </Window>
    </Body>
  </>
}

export const Authorization = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')


  return <>
    <Body>
      <Window>
        <Window.Title>Окно авторизации</Window.Title>
        <Input type="password" placeholder="Почта"></Input>
        <Input placeholder="Пароль"></Input>
        <RButton>Авторизация</RButton>
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