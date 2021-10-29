import React from 'react';

const ContactRow = ({ el, deleteContact, setIsEdit }) => {
  return (
    <tr>
      <td>{el.names}</td>
      <td>{el.last_name}</td>
      <td>{el.phone}</td>
      <td>{el.address}</td>
      <td className="btn-group">
        <button
          title="Editar"
          className="btn btn-info"
          onClick={(e) => {
            /**Modifica el estado se isEdit para saber si se esta editando o creando un contacto
             * Si se le pasa todo el objeto con la informacion de contacto, es porque se esta editando
             */
            setIsEdit(el);
          }}
        >
          Editar 📝
        </button>
        <button title="Borrar" className="btn btn-danger" onClick={(e) => deleteContact(el.id)}>
          Borrar ❌
        </button>
      </td>
    </tr>
  );
};

export default ContactRow;
