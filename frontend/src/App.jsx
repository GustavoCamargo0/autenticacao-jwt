import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import Configs from "./pages/Configs";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const navigate = useNavigate();

  return (
    <div>
      <h2> Bem-vindo ao Dashboard!</h2>
      <button onClick={handleLogout}>Sair</button>
      <button onClick={() => navigate("/dashboard/perfil")}>Perfil</button>
      <button onClick={() => navigate("/dashboard/configs")}>Configurações</button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registro" element={<Registro />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/configs"
          element={
            <ProtectedRoute>
              <Configs />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
