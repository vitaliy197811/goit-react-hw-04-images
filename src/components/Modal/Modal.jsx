import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const Modal = ({ close, url }) => {
    const closeModal = event => {
        if (event.currentTarget === event.target || event.code === 'Escape') {
        close()
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', closeModal);
        return (() => {window.removeEventListener('keydown', closeModal)});
    });
        
    return createPortal (
        <div  className={css.Overlay} onClick={closeModal}>
            <div  className={css.Modal}>
                <img src={url} alt="" />
            </div>
        </div>,
        document.querySelector('#root')
    );
}

Modal.propTypes = {
    closeModal: PropTypes.func,
    url: PropTypes.string,
};

export default Modal;