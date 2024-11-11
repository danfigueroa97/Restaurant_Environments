import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Loginn.css';

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8090/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreUsuario, password }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate('/cliente');
      } else {
        console.error("Error en las credenciales");
      }
    } catch (error) {
      console.error("Error en la solicitud de inicio de sesión", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="nombreUsuario">Nombre de Usuario</label>
            <input
              type="text"
              id="nombreUsuario"
              placeholder="Ingrese su nombre de usuario"
              value={nombreUsuario} 
              onChange={(e) => setNombreUsuario(e.target.value)} 
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

