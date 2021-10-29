import React, { useState, useEffect } from 'react';

/**Estado inicial del formulario
 * Todos los campos estan vacios y el id es nulo
 */
let initialForm = {
  id: null,
  names: '',
  last_name: '',
  phone: '',
  address: '',
};

/**Validacion para los nombres y apellidos */
const validateNames = (text) => {
  /* /^[A-Za-zÑñÁÉÍÓÚÜáéíóúü\s]+$/g */
  let regText = /^([A-ZÑÁÉÍÓÚÜ]{1}[a-zñáéíóúü]+[\s]*)+$/g;
  if (regText.test(text)) {
    return true;
  } else {
    return false;
  }
};

/**Validacion para el numero de telefono
 * Valida que el telefono tenga 10 digitos(celular) o 7 digitos (fijo)
 * Tambien si el telefono comienza con el indicativo de un pais o no
 */
const validatePhone = (number) => {
  let regMobile = /^([+][\d]*[ ]?)?[\d]{10}$/g,
    regHome = /^([+][\d]*[ ]?)?[\d]{7}$/g;
  if (regMobile.test(number) || regHome.test(number)) {
    return true;
  } else {
    return false;
  }
};

const ContactForm = ({
  createContact,
  updateContact,
  isEdit,
  setIsEdit,
  setAlertMessage,
  setModalIsActive,
}) => {
  /**Variable de estado para controlar el formulario de contactos */
  const [form, setForm] = useState(initialForm);

  /**Variable para el titulo de la seccion */
  let accion = isEdit ? 'Eitar Contacto' : 'Agregar Contacto';

  /**Vigilará si el estado de isEdit cambia para saber si se edita o no.
   * Se se esta editando, el estado del formulario reibirá el objeto de isEdit(informacion del contacto a editar)
   * Al recibirlo, los inputs del formulario, obtendran el valor que este objeto tenga
   * En caso de que no se este editando, el formulario recibirá la configuracion inicial
   */
  useEffect(() => {
    if (isEdit) {
      setForm(isEdit);
    } else {
      setForm(initialForm);
    }
  }, [isEdit]);

  /**Manejador de los cambios en los inputs
   * Cuando cambie un input, se alterará la propiedad del form que tenga el mismo nombre del input
   * Por ejemplo, si se escribe en apellidos, su name = "last_name", es igual a la propiedad "last_name" del estado form y 
    se le asignará el valor que viene en el input 
   */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /**Manejador del submit del formulario
   * Realizará las validaciones
   * Si todos es correcto, validará si se esta creando o editando un contacto, dependiendo del id del form
   * Si el id esta vacio es porque se esta creando un nuevo contacto, si no, es porque se está editando
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.names || !form.last_name || !form.phone || !form.address) {
      setAlertMessage('Todos los campos son requeridos');
      setModalIsActive(true);
      return;
    }
    if (!validateNames(form.names)) {
      setAlertMessage('El nombre no puede contener numeros y/o caracteres especiales');
      setModalIsActive(true);
      return;
    }
    if (!validateNames(form.last_name)) {
      setAlertMessage('El apellido no puede contener numeros y/o caracteres especiales');
      setModalIsActive(true);
      return;
    }
    if (!validatePhone(form.phone)) {
      setAlertMessage('El numero de teléfono no es valido');
      setModalIsActive(true);
      return;
    }
    if (form.id === null) {
      createContact(form);
    } else {
      updateContact(form);
    }

    handleClear();
  };

  /**Manejador para limpiar el formulario
   * Pasará el estado inicial a form lo que hará que los inputs queden en su estado original
   * Actualizá el estado de isEdit a null, lo cual indicará que no se esta editando
   */
  const handleClear = (e) => {
    setForm(initialForm);
    setIsEdit(null);
  };

  return (
    <div className="component-container">
      <h3 className="component-title">{accion}</h3>
      <form onSubmit={handleSubmit} className="container form">
        <div className="mb-3 row">
          <div className="col">
            <input
              type="text"
              name="names"
              placeholder="Nombres"
              className="form-control"
              onChange={handleChange}
              value={form.names}
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="last_name"
              placeholder="Apellidos"
              className="form-control"
              onChange={handleChange}
              value={form.last_name}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col">
            <input
              type="text"
              name="phone"
              placeholder="Teléfono"
              className="form-control"
              onChange={handleChange}
              value={form.phone}
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="address"
              placeholder="Direccion"
              className="form-control"
              onChange={handleChange}
              value={form.address}
            />
          </div>
        </div>

        <div className="gap-3 d-md-flex justify-content-md-center mb-3">
          <input type="submit" value="Enviar" className="btn btn-outline-primary" />
          <input
            type="reset"
            value="Limpiar"
            className="btn btn-outline-primary"
            onClick={handleClear}
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
