import React from 'react'
import { IUser } from 'src/API/user/profileData'

export default React.createContext<IUser | undefined>({
  id: '',
  username: '',
  email: '',
} )