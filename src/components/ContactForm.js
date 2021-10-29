import React, { useState, useEffect } from 'react';

let initialForm = {
  id: null,
  names: '',
  last_name: '',
  phone: '',
  address: '',
};

const validateNames = (text) => {
  /* /^[A-Za-zÑñÁÉÍÓÚÜáéíóúü\s]+$/g */
  let regText = /^([A-ZÑÁÉÍÓÚÜ]{1}[a-zñáéíóúü]+[\s]*)+$/g;
  if (regText.test(text)) {
    return true;
  } else {
    return false;
  }
};

const validatePhone = (number) => {
  //Valida que el telefono tenga 10 digitos(celular) o 7 digitos (fijo)
  //tambien si el telefono comienza con el indicativo de un pais o no
  let regMobile = /^([+][\d]*[ ]?)?[\d]{10}$/g,
    regHome = /^([+][\d]*[ ]?)?[\d]{7}$/g;
  if (regMobile.test(number) || regHome.test(number)) {
    return true;
  } else {
    return false;
  }
};

const ContactForm = ({
  createContact,
  updateContact,
  isEdit,
  setIsEdit,
  setAlertMessage,
  setModalIsActive,
}) => {
  const [form, setForm] = useState(initialForm);

  let accion = isEdit ? 'Eitar Contacto' : 'Agregar Contacto';

  useEffect(() => {
    if (isEdit) {
      setForm(isEdit);
    } else {
      setForm(initialForm);
    }
  }, [isEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.names || !form.last_name || !form.phone || !form.address) {
      setAlertMessage('Todos los campos son requeridos');
      setModalIsActive(true);
      return;
    }
    if (!validateNames(form.names)) {
      setAlertMessage('El nombre no puede contener numeros y/o caracteres especiales');
      setModalIsActive(true);
      return;
    }
    if (!validateNames(form.last_name)) {
      setAlertMessage('El apellido no puede contener numeros y/o caracteres especiales');
      setModalIsActive(true);
      return;
    }
    if (!validatePhone(form.phone)) {
      setAlertMessage('El numero de teléfono no es valido');
      setModalIsActive(true);
      return;
    }
    if (form.id === null) {
      createContact(form);
    } else {
      updateContact(form);
    }

    handleClear();
  };

  const handleClear = (e) => {
    setForm(initialForm);
    setIsEdit(null);
  };

  return (
    <div className="component-container">
      <h3 className="component-title">{accion}</h3>
      <form onSubmit={handleSubmit} className="container form">
        <div className="mb-3 row">
          <div className="col">
            <input
              type="text"
              name="names"
              placeholder="Nombres"
              className="form-control"
              onChange={handleChange}
              value={form.names}
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="last_name"
              placeholder="Apellidos"
              className="form-control"
              onChange={handleChange}
              value={form.last_name}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col">
            <input
              type="text"
              name="phone"
              placeholder="Teléfono"
              className="form-control"
              onChange={handleChange}
              value={form.phone}
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="address"
              placeholder="Direccion"
              className="form-control"
              onChange={handleChange}
              value={form.address}
            />
          </div>
        </div>

        <div className="gap-3 d-md-flex justify-content-md-center mb-3">
          <input type="submit" value="Enviar" className="btn btn-outline-primary" />
          <input
            type="reset"
            value="Limpiar"
            className="btn btn-outline-primary"
            onClick={handleClear}
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
