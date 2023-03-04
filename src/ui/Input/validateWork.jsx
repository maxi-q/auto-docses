export default {
  login: {
    required: 'Это поле обязательно!',
    minLength: {
      value: 3,
      message: 'Логин должен быть длиной 3+ символов.'
    }
  },
  email: { 
    required: 'Это поле обязательно!',
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Невалидный емайл.'
    }
  },
  password: {
    required: 'Это поле обязательно!',
    minLength: {
      value: 6,
      message: 'Пароль должен быть длиной 6+ символов.'
    }
  },
}
  