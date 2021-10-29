import React, { useState, useEffect } from 'react';
import ContacTable from './ContacTable';
import ContactForm from './ContactForm';
import generateUUID from '../helpers/uniqueId';
import './ContactApp.css';
import AlertModal from './AlertModal';

const ls = localStorage,
  lsDB = 'contacts';

const initialDataBase = ls.getItem(lsDB) ? JSON.parse(ls.getItem(lsDB)) : [];

const ContactApp = () => {
  const [dataBase, setDataBase] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    setDataBase([...initialDataBase]);
  }, []);

  const createContact = (contact) => {
    let phoneInDataBase = dataBase.find((el) => el.phone === contact.phone);
    if (phoneInDataBase) {
      setAlertMessage('El teléfono del usuario ya esta en la lista de contactos');
      setModalIsActive(true);

      return;
    }
    contact.id = generateUUID();
    setDataBase([...dataBase, contact]);
    ls.setItem(lsDB, JSON.stringify([...dataBase, contact]));
    setAlertMessage('Contacto agregado');
    setModalIsActive(true);
  };

  const updateContact = (contact) => {
    let newContacts = dataBase.map((el) => (el.id === contact.id ? contact : el));
    let validateContact = newContacts.find((el) => el.id === contact.id);

    if (contact === validateContact) {
      setDataBase([...newContacts]);
      ls.setItem(lsDB, JSON.stringify([...newContacts]));
      setAlertMessage('Contacto actualizado');
      setModalIsActive(true);
    } else {
      setAlertMessage('No se pudo actualizar el contacto');
      setModalIsActive(true);
    }
  };

  const deleteContact = (phone) => {
    let conf = window.confirm('¿Desea eliminar este contacto?');
    if (conf) {
      let newContacts = dataBase.filter((el) => el.phone !== phone);
      setDataBase([...newContacts]);
      ls.setItem(lsDB, JSON.stringify([...newContacts]));
      setAlertMessage('Contacto Eliminado');
      setModalIsActive(true);
    }
  };

  return (
    <div className="container">
      <h1 className="main-title">Contact App</h1>
      <AlertModal
        modalIsActive={modalIsActive}
        setModalIsActive={setModalIsActive}
        alertMessage={alertMessage}
        setAlertMessage={setAlertMessage}
      />
      <ContactForm
        createContact={createContact}
        updateContact={updateContact}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setAlertMessage={setAlertMessage}
        setModalIsActive={setModalIsActive}
      />
      <hr />
      <ContacTable data={dataBase} deleteContact={deleteContact} setIsEdit={setIsEdit} />
    </div>
  );
};

export default ContactApp;
