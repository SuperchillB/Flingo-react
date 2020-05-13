import React, { useEffect, createContext, useState, useContext } from 'react';
import { createPortal } from 'react-dom';
import CreateIcon from '../../../assets/flingo-icons-plus.svg';
import styles from './styles.modal.scss';

const modalRoot = document.getElementById('modal');

const modalState = createContext(null);
const { Provider } = modalState;

const ModalProvider = ({ children }) => {
  const [modalContext, setModalContext] = useState({
    isOpen: false,
  });
  const updateModalContext = (prop, value) => {
    setModalContext((prevContext) => ({ ...prevContext, [prop]: value }));
  };

  return (
    <Provider value={{ modalContext, updateModalContext }}>{children}</Provider>
  );
};

// const Modal = ({ isOpen = false, children }) => {
const Modal = ({ children }) => {
  const { modalContext, updateModalContext } = useContext(modalState);
  const el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  return (
    modalContext.isOpen &&
    createPortal(
      <div className={styles.modalOverlay}>
        <div
          className={styles.modalContainer}
          onBlur={() => updateModalContext('isOpen', false)}
        >
          <button
            className={styles.modalClose}
            type="button"
            onClick={() => updateModalContext('isOpen', false)}
            tabIndex="0"
          >
            <CreateIcon />
          </button>
          <div className={styles.modalBody}>{children}</div>
        </div>
      </div>,
      el,
    )
  );
};

export { Modal, ModalProvider, modalState };
