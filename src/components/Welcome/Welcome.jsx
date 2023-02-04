import React,{useState} from 'react'

import { Modal, Button } from '@ui'

export const Welcome = ({buttontext, children}) => {
  const [modalActive, setModalActive] = useState(false)

  return (
    <>
      <Button onClick={()=>{setModalActive(true)}}>{ buttontext }</Button>
      <Modal active={modalActive} setActive={setModalActive}>{ children }</Modal>
    </>
  )
}