import React, { useState, useEffect } from 'react';

let initialForm = {
  id: null,
  names: '',
  last_name: '',
  phone: '',
  address: '',
};

const ContactForm = ({ createContact, updateContact, isEdit, setIsEdit }) => {
  const [form, setForm] = useState(initialForm);

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
      <h3>Agregar</h3>
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
