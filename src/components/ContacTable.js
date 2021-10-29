import React from 'react';
import ContactRow from './ContactRow';

const ContacTable = ({ data, deleteContact, setIsEdit }) => {
  return (
    <div className="component-container">
      <h3 className="row mb-3 component-title">Lista de Contactos</h3>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Teléfono</th>
            <th>Direccion</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5">Sin registros en la libreta de contactos</td>
            </tr>
          ) : (
            data.map((el) => (
              <ContactRow key={el.id} el={el} deleteContact={deleteContact} setIsEdit={setIsEdit} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContacTable;
