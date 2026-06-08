import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Perfil from './pages/Perfil';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function Perfil() {
  return (
    <div>
      <h2>Perfil do Usuário</h2>
      <p>Este é o perfil do usuário.</p>
      
    </div>
  );
}

export default Perfil;

    