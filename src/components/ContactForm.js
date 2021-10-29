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
  let regText = /^([+][\d]*[ ]?)?[\d]{10}$/g;
  if (regText.test(number)) {
    return true;
  } else {
    return false;
  }
};

const ContactForm = ({ createContact, updateContact, isEdit, setIsEdit }) => {
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
      alert('Todos los campos son requeridos');
      return;
    }
    if (!validateNames(form.names)) {
      alert('El nombre no puede contener numeros y/o caracteres especiales');
      return;
    }
    if (!validateNames(form.last_name)) {
      alert('El apellido no puede contener numeros y/o caracteres especiales');
      return;
    }
    if (!validatePhone(form.phone)) {
      alert('El numero de teléfono no es valido');
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
    <div>
      <h3>{accion}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="names"
            placeholder="Nombres"
            onChange={handleChange}
            value={form.names}
          />
        </div>
        <div>
          <input
            type="text"
            name="last_name"
            placeholder="Apellidos"
            onChange={handleChange}
            value={form.last_name}
          />
        </div>
        <div>
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            onChange={handleChange}
            value={form.phone}
          />
        </div>
        <div>
          <input
            type="text"
            name="address"
            placeholder="Direccion"
            onChange={handleChange}
            value={form.address}
          />
        </div>
        <div>
          <input type="submit" value="Enviar" />
          <input type="reset" value="Limpiar" onClick={handleClear} />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
