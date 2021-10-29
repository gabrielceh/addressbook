import React, { useEffect, useRef } from 'react';

const AlertModal = ({ modalIsActive, setModalIsActive, alertMessage, setAlertMessage }) => {
  /**Guardamos la referencia de modal */
  const refModal = useRef();

  /**Se activara o desactivara el modal segun el estado de modalIsActive */
  useEffect(() => {
    if (modalIsActive) {
      refModal.current.classList.add('modal-active');
    } else {
      refModal.current.classList.remove('modal-active');
    }
  }, [modalIsActive]);

  /**Desactivamos el modal, pasandole false al estado
   * Devolvemos el estado de los mensajes de alerta a vacio
   */
  const handleModal = (e) => {
    if (modalIsActive) {
      setModalIsActive(false);
      setAlertMessage('');
    }
  };

  return (
    <div className="container mt-2 component-container modal-container" ref={refModal}>
      <div className="alert alert-primary alert-dismissible fade show" role="alert">
        <p>{alertMessage}</p>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={handleModal}
        ></button>
      </div>
    </div>
  );
};

export default AlertModal;
