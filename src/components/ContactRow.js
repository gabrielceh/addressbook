import React from 'react';

const ContactRow = ({ el, deleteContact }) => {
  return (
    <tr>
      <td>{el.names}</td>
      <td>{el.last_name}</td>
      <td>{el.phone}</td>
      <td>{el.address}</td>
      <td>
        <button title="Editar">Editar 📝</button>
        <button title="Borrar" onClick={(e) => deleteContact(el.phone)}>
          Borrar ❌
        </button>
      </td>
    </tr>
  );
};

export default ContactRow;
