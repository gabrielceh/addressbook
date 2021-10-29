import React from 'react';
import ContactRow from './ContactRow';

const ContacTable = ({ data, deleteContact }) => {
  return (
    <div>
      <h3>Lsita de Contactos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Teléfono</th>
            <th>Direccion</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5">Sin registros en la libreta de contactos</td>
            </tr>
          ) : (
            data.map((el) => <ContactRow key={el.phone} el={el} deleteContact={deleteContact} />)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContacTable;
