import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Por enquanto, vamos simular procurando o token no localStorage
  const token = localStorage.getItem('token');

  if (!token) {
    // Redireciona para o login se não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;