import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

function Perfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [criadoEm, setCriadoEm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setEmail(decoded.email);
      setNome(decoded.nome);
      setCriadoEm(decoded.criado_em);
    }
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Perfil do Usuário</h2>
      <div style={{ marginBottom: "10px" }}>
        <strong>Nome:</strong> {nome}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>E-mail:</strong> {email}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <strong>Data de Criação:</strong>{" "}
        {new Date(criadoEm).toLocaleString("pt-BR")}
      </div>
    </div>
  );
}

export default Perfil;
