import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../estilos/Cliente.css';

const ClienteTable = () => {
  const [clientes, setClientes] = useState([]);

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

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Documento</th>
            <th>Número de Documento</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteTable;
