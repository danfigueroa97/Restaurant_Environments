import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './componentes/Loginn';
import Cliente from './componentes/Cliente';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  {/* Página de inicio de sesión */}
          <Route path="/cliente" element={<Cliente />} />  {/* Página de cliente, solo accesible después de iniciar sesión */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
