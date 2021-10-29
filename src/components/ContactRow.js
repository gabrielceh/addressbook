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
            setIsEdit(el);
          }}
        >
          Editar 📝
        </button>
        <button title="Borrar" className="btn btn-danger" onClick={(e) => deleteContact(el.phone)}>
          Borrar ❌
        </button>
      </td>
    </tr>
  );
};

export default ContactRow;
