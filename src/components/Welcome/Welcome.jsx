import React,{useState} from 'react';
import { Modal } from '../../ui';
import styled from 'styled-components';
import { Button } from '../../ui';

export const Welcome = ({buttontext, children}) => {
    const [modalActive, setModalActive] = useState(false);

    return (
        <>
            <Button onClick={()=>{setModalActive(true)}}>{ buttontext }</Button>
            <Modal active={modalActive} setActive={setModalActive}>{ children }</Modal>
        </>
    )
}

// const Button = styled.button`
//   display: inline-block;
//   color: #003153;
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid #42AAFF;
//   border-radius: 3px;
//   display: block;
// `;