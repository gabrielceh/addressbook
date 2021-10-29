import React, { useState, useEffect } from 'react';
import ContacTable from './ContacTable';
import ContactForm from './ContactForm';
import generateUUID from '../helpers/uniqueId';

const ls = localStorage,
  lsDB = 'contacts';

const initialDataBase = ls.getItem(lsDB) ? JSON.parse(ls.getItem(lsDB)) : [];

const ContactApp = () => {
  const [dataBase, setDataBase] = useState([]);
  const [isEdit, setIsEdit] = useState(null);

  useEffect(() => {
    setDataBase([...initialDataBase]);
  }, []);

  const createContact = (contact) => {
    let phoneInDataBase = dataBase.find((el) => el.phone === contact.phone);
    if (phoneInDataBase) {
      alert('El teléfono del usuario ya esta en la lista de contactos');
      return;
    }
    contact.id = generateUUID();
    setDataBase([...dataBase, contact]);
    ls.setItem(lsDB, JSON.stringify([...dataBase, contact]));
    alert('Contacto agregado');
  };

  const updateContact = (contact) => {
    let newContacts = dataBase.map((el) => (el.id === contact.id ? contact : el));
    let validateContact = newContacts.find((el) => el.id === contact.id);

    if (contact === validateContact) {
      setDataBase([...newContacts]);
      ls.setItem(lsDB, JSON.stringify([...newContacts]));
      alert('Contacto actualizado');
    } else {
      alert('No se pudo actualizar el contacto');
    }
  };

  const deleteContact = (phone) => {
    let conf = window.confirm('¿Desea eliminar este contacto?');
    if (conf) {
      let newContacts = dataBase.filter((el) => el.phone !== phone);
      setDataBase([...newContacts]);
      ls.setItem(lsDB, JSON.stringify([...newContacts]));
      alert('Contacto Eliminado');
    }
  };

  return (
    <>
      <h1>Contact App</h1>
      <ContactForm
        createContact={createContact}
        updateContact={updateContact}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <ContacTable data={dataBase} deleteContact={deleteContact} setIsEdit={setIsEdit} />
    </>
  );
};

export default ContactApp;
