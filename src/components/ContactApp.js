import React, { useState, useEffect } from 'react';
import ContacTable from './ContacTable';
import ContactForm from './ContactForm';
import './ContactApp.css';
import AlertModal from './AlertModal';
import { v4 as uuidv4 } from 'uuid';

/**Guarda localStorage en una variable
 * Guarda el item que usaremos para localStorage
 */
const ls = localStorage,
  lsDB = 'contacts';

/**Almacena lo que trae localStorage en el item para luego pasarlo al estado */
const initialDataBase = ls.getItem(lsDB) ? JSON.parse(ls.getItem(lsDB)) : [];

const ContactApp = () => {
  /**Variables de estado que se usaran */
  /**Estado que almacenará los contactos */
  const [dataBase, setDataBase] = useState([]);
  /**Estado que controlará si se está editando o no un contacto
   * Si se esta editando un contacto, recibirá un objeto con todos los datos de este, incluido el id
   * Si no se esta editanto, su estdo será null
   */
  const [isEdit, setIsEdit] = useState(null);
  /**Estado que indicará Cuando modalIsActive pase a true, se mostrará el modal, cuando sea false, el modal se ocultará */
  const [modalIsActive, setModalIsActive] = useState(false);
  /**Estado que almacenará el mensaje que se mostrará en el modal de acuerdo a la accion que se realice */
  const [alertMessage, setAlertMessage] = useState('');

  /**Etapa de montaje.
   * Se asigna el valor inicial a la dataBase o lista de contactos*/
  useEffect(() => {
    setDataBase([...initialDataBase]);
  }, []);

  /**Funcion agragar contacto
   * Recibe un objeto con los datos del usuario, excepto el id
   * Valida si el numero de telefono del contacto ya está en la base de datos, si ya esté el numero, no agregará al contacto
   * Si el numero no está, generará un id unico(usamos la libreria)
   * Almacenaremos los contactos que ya estan en la base de datos de contactos y agregaremos el nuevo contacto
   * Cambiaremos el estado de alertMessage y modalIsActive para que muestre el modal
   */
  const createContact = (contact) => {
    let phoneInDataBase = dataBase.find((el) => el.phone === contact.phone);
    if (phoneInDataBase) {
      setAlertMessage('El teléfono del usuario ya esta en la lista de contactos');
      setModalIsActive(true);
      return;
    }
    contact.id = uuidv4();
    setDataBase([...dataBase, contact]);
    ls.setItem(lsDB, JSON.stringify([...dataBase, contact]));
    setAlertMessage('Contacto agregado');
    setModalIsActive(true);
  };

  /**Funcion actualizar contacto
   * Recibe un objeto con los datos del usuario, incluido el id
   * Valida si el numero de id interno del contacto ya está en la base de datos, si ya esté el id, cambiará al contacto viejo por el nuevo
   * Valida que el id este en los contactos actualizado, ya que puede eliminar un contacto mientras se esta actualizando
   * Si el id del contacto actualizado esta en los nuevos contactos, se actualizará la base de datos con los datos de los contactos nuevos
   * En caso contrario, se mostrará un error
   * Cambiaremos el estado de alertMessage y modalIsActive para que muestre el modal
   */
  const updateContact = (contact) => {
    let newContacts = dataBase.map((el) => (el.id === contact.id ? contact : el));
    let validateContact = newContacts.find((el) => el.id === contact.id);

    if (contact === validateContact) {
      setDataBase([...newContacts]);
      ls.setItem(lsDB, JSON.stringify([...newContacts]));
      setAlertMessage('Contacto actualizado');
      setModalIsActive(true);
      return;
    }
    setAlertMessage('No se pudo actualizar el contacto');
    setModalIsActive(true);
  };

  /**Funcion eliminar contacto
   * Recibe el id del contacto a eliminar
   * Valida si se desea eliminar el contacto
   * Filtra para crear un nuevo arreglo con los contactos que no coincidan con el id a eliminar
   * Se actuliza la base de datos con los nuevos contactos
   * Cambiaremos el estado de alertMessage y modalIsActive para que muestre el modal
   */
  const deleteContact = (id) => {
    let conf = window.confirm('¿Desea eliminar este contacto?');
    if (conf) {
      let newContacts = dataBase.filter((el) => el.id !== id);
      setDataBase([...newContacts]);
      ls.setItem(lsDB, JSON.stringify([...newContacts]));
      setAlertMessage('Contacto Eliminado');
      setModalIsActive(true);
    }
  };

  return (
    <div className="container container-app">
      <AlertModal
        modalIsActive={modalIsActive}
        setModalIsActive={setModalIsActive}
        alertMessage={alertMessage}
        setAlertMessage={setAlertMessage}
      />
      <h1 className="main-title">Contact App</h1>
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
