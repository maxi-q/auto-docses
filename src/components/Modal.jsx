import React from 'react';

const Modal = ({active, setActive}) => {
    return (
        <div className={active ? "modalPLP active" : "modalPLP"} onClick={() => setActive(false)}>
            <div className="modal__content"  onClick={() => setActive(false)}>
                asdqw
            </div>
        </div>
    );
}

export default Modal;