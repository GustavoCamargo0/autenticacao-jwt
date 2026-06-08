import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importando o axios

function Registro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (senha === confSenha) {
    try {
      const resposta = await axios.post("http://localhost:3000/registrar", {
        nome,
        email,
        senha,
      });

      navigate("/login");

    } catch (err) {
      if (err.response && err.response.data) {

        if (err.response.data.mensagem === "E-mail já registrado") {
          setErro("Email já registrado");

        } else {
          setErro(err.response.data.mensagem || "Erro desconhecido");
        }

      } else {
        setErro("Erro ao conectar com o servidor");
      }
    }

  } else {
    setErro("As senhas não coincidem");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2> Tela de Registro</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          gap: "10px",
        }}
      >
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirme Senha:</label>
          <input
            type="password"
            value={confSenha}
            onChange={(e) => setConfSenha(e.target.value)}
            required
          />
        </div>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Registro;
