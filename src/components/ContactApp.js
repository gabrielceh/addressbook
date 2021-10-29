import React, { useState } from 'react';
import ContacTable from './ContacTable';
import ContactForm from './ContactForm';
import generateUUID from '../helpers/uniqueId';

const initialDataBase = [
  {
    names: 'Gabriel',
    last_name: 'Cervantes',
    phone: '4273847',
    address: 'Calle 15',
    id: 1,
  },
  {
    names: 'Angie',
    last_name: 'Hurtado',
    phone: '578567',
    address: 'Calle 60',
    id: 2,
  },
  {
    names: 'Jon',
    last_name: 'Senna',
    phone: '1234324',
    address: 'WWF',
    id: 3,
  },
];

const ContactApp = () => {
  const [dataBase, setDataBase] = useState(initialDataBase);

  const [isEdit, setIsEdit] = useState(null);

  const createContact = (contact) => {
    let phoneInDataBase = dataBase.find((el) => el.phone === contact.phone);
    if (phoneInDataBase) {
      alert('El teléfono de contácto ya esta en la lista de contactos');
      return;
    }
    contact.id = generateUUID();
    setDataBase([...dataBase, contact]);
  };

  const updateContact = (contact) => {};

  const deleteContact = (phone) => {
    let conf = window.confirm('¿Desea eliminar este contacto?');
    if (conf) {
      let newContacts = dataBase.filter((el) => el.phone !== phone);
      setDataBase([...newContacts]);
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
