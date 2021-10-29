import React, { useEffect, useRef } from 'react';

const AlertModal = ({ modalIsActive, setModalIsActive, alertMessage, setAlertMessage }) => {
  const refModal = useRef();

  useEffect(() => {
    if (modalIsActive) {
      refModal.current.classList.add('modal-active');
    } else {
      refModal.current.classList.remove('modal-active');
    }
  }, [modalIsActive]);

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
