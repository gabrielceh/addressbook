import React, { useState } from 'react';
import ContacTable from './ContacTable';
import ContactForm from './ContactForm';

const initialDataBase = [
  {
    names: 'Gabriel',
    last_name: 'Cervantes',
    phone: '4273847',
    address: 'Calle 15',
  },
  {
    names: 'Angie',
    last_name: 'Hurtado',
    phone: '578567',
    address: 'Calle 60',
  },
  {
    names: 'Jon',
    last_name: 'Senna',
    phone: '1234324',
    address: 'WWF',
  },
];

const ContactApp = () => {
  const [dataBase, setDataBase] = useState(initialDataBase);

  return (
    <>
      <h1>Contact App</h1>
      <ContactForm />
      <ContacTable data={dataBase} />
    </>
  );
};

export default ContactApp;
