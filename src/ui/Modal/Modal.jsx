import React from 'react';
import styled from 'styled-components';

export const Modal = ({active, setActive, children}) => {
    return (
        <ModalBG active={active} onClick={() => setActive(false)}>
            <ModalContent onClick={() => setActive(false)}>
                {children}
            </ModalContent>
        </ModalBG>
    );
}

const ModalContent = styled.div`
        padding: 20px;
        border-radius: 12px;
        background: rgb(227, 227, 227);
        pointer-events: all;
`
const ModalBG = styled.div`
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,0.4);
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    pointer-events: ${props => props.active ? "all" : "none"};

    transition: 0.5s;
    opacity: ${props => props.active ? 1 : 0};
    
`;