import React from 'react';

const ContactRow = ({ el }) => {
  return (
    <tr>
      <td>{el.names}</td>
      <td>{el.last_name}</td>
      <td>{el.phone}</td>
      <td>{el.address}</td>
      <td>
        <button title="Editar">Editar 📝</button>
        <button title="Borrar">Borrar ❌</button>
      </td>
    </tr>
  );
};

export default ContactRow;
