import React, { useEffect, useRef } from 'react';

const AlertModal = ({ modalIsActive, setModalIsActive, alertMessage, setAlertMessage }) => {
  const refModal = useRef();

  useEffect(() => {
    if (modalIsActive) {
      refModal.current.style.display = 'block';
    } else {
      refModal.current.style.display = 'none';
    }
  }, [modalIsActive]);

  const handleModal = (e) => {
    if (modalIsActive) {
      setModalIsActive(false);
      setAlertMessage('');
      refModal.current.style.display = 'none';
    }
  };

  return (
    <div className="container mt-2 component-container" ref={refModal}>
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
