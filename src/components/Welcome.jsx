import React,{useState} from 'react';
import Modal from './Modal';

const Welcome = () => {
    const [modalActive, setModalActive] = useState(true);

    return (
        <>
        <button className='open-btn' onClick={()=>{setModalActive(true)}}>Открыть модальное окно</button>
        <Modal active={modalActive} setActive={setModalActive}/>
        </>
    )
}


export default Welcome;