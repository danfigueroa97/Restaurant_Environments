import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../estilos/Cliente.css';

const ClienteTable = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCliente, setNewCliente] = useState({
    idTipoDocumento: {
      id_tipodocumento: 0,
    },
    numeroDocumento: '',
    nombre: '',
    direccion: '',
    telefono: '',
    email: ''
  });

  // Realizar la solicitud GET para obtener los datos de los clientes
  useEffect(() => {
    axios.get('http://localhost:8090/api/clientes/list')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los clientes:', error);
      });
  }, []);

  // Actualizar los campos del nuevo cliente en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCliente(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Actualizar el campo idTipoDocumento en el formulario
  const handleTipoDocumentoChange = (e) => {
    const { name, value } = e.target;
    setNewCliente(prevState => ({
      ...prevState,
      idTipoDocumento: {
        ...prevState.idTipoDocumento,
        [name]: value
      }
    }));
  };

  // Enviar el nuevo cliente a la base de datos
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar los datos antes de enviarlos
    console.log(newCliente);

    // Validar los datos del nuevo cliente
    if (!newCliente.idTipoDocumento.id_tipodocumento || !newCliente.numeroDocumento || !newCliente.nombre || !newCliente.direccion || !newCliente.telefono || !newCliente.email) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Enviar el nuevo cliente al backend
    axios.post('http://localhost:8090/api/clientes/', {
      id: 0,
      idTipoDocumento: newCliente.idTipoDocumento, 
      numeroDocumento: newCliente.numeroDocumento,
      nombre: newCliente.nombre,
      direccion: newCliente.direccion,
      telefono: newCliente.telefono,
      email: newCliente.email
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        setClientes([...clientes, response.data]);
        setShowModal(false);
        setNewCliente({
          idTipoDocumento: { id_tipodocumento: 0},
          numeroDocumento: '',
          nombre: '',
          direccion: '',
          telefono: '',
          email: ''
        });
      })
      .catch(error => {
        console.error('Error al agregar el cliente:', error);
        alert('Hubo un error al agregar el cliente. Intenta nuevamente.');
      });
  };
// Función para eliminar un cliente por su ID
const handleDelete = (id) => {
  if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
    axios.delete(`http://localhost:8090/api/clientes/${id}`)
      .then(() => {
        setClientes(clientes.filter(cliente => cliente.id !== id));
        alert('Cliente eliminado con éxito.');
      })
      .catch(error => {
        console.error('Error al eliminar el cliente:', error);
        alert('Hubo un error al eliminar el cliente.');
      });
  }
};
// Función para llenar el formulario con los datos del cliente a editar
const handleEdit = (cliente) => {
  setNewCliente({
    ...cliente,
    idTipoDocumento: { id_tipodocumento: cliente.idTipoDocumento.id_tipodocumento || 0 }
  });
  setShowModal(true);
};

// Función para actualizar el cliente
const handleUpdate = (e) => {
  e.preventDefault();

  // Validar los datos del cliente
  if (!newCliente.idTipoDocumento.id_tipodocumento || !newCliente.numeroDocumento || !newCliente.nombre || !newCliente.direccion || !newCliente.telefono || !newCliente.email) {
    alert('Por favor, complete todos los campos.');
    return;
  }
console.log(newCliente)
  axios.put(`http://localhost:8090/api/clientes/${newCliente.id}`, newCliente, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      setClientes(clientes.map(cliente => cliente.id === response.data.id ? response.data : cliente));
      setShowModal(false);
      setNewCliente({
        idTipoDocumento: { id_tipodocumento: 0 },
        numeroDocumento: '',
        nombre: '',
        direccion: '',
        telefono: '',
        email: ''
      });
    })
    .catch(error => {
      console.error('Error al actualizar el cliente:', error);
      alert('Hubo un error al actualizar el cliente. Intenta nuevamente.');
    });
};



  return (
    <div>
      <h2>Lista de Clientes</h2>
      
      {/* Botón para mostrar el formulario de agregar cliente */}
      <button onClick={() => setShowModal(true)}>Agregar Cliente</button>

      {/* Tabla de clientes */}
      <table border="1">
        <thead>
          <tr>
            <th>ID Cliente</th>
            <th>Tipo de Documento</th>
            <th>Número de Documento</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.idTipoDocumento.tipo}</td>
              <td>{cliente.numeroDocumento}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.email}</td>
              <td>
              <button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
              <button onClick={() => handleEdit(cliente)}>Editar</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar un nuevo cliente */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
          <h3>{newCliente.id ? "Editar Cliente" : "Agregar Nuevo Cliente"}</h3>
            <form onSubmit={newCliente.id ? handleUpdate : handleSubmit}>
              <label>Tipo de Documento:</label>
              <input
                type="number"
                name="id_tipodocumento"
                value={newCliente.idTipoDocumento.id_tipodocumento}
                onChange={handleTipoDocumentoChange}
                required
              />
              <label>Número de Documento:</label>
              <input
                type="text"
                name="numeroDocumento"
                value={newCliente.numeroDocumento}
                onChange={handleChange}
                required
              />
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={newCliente.nombre}
                onChange={handleChange}
                required
              />
              <label>Dirección:</label>
              <input
                type="text"
                name="direccion"
                value={newCliente.direccion}
                onChange={handleChange}
                required
              />
              <label>Teléfono:</label>
              <input
                type="text"
                name="telefono"
                value={newCliente.telefono}
                onChange={handleChange}
                required
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={newCliente.email}
                onChange={handleChange}
                required
              />
              <button type="submit">
              {newCliente.id ? "Actualizar Cliente" : "Guardar Cliente"}
              </button>
              <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClienteTable;

