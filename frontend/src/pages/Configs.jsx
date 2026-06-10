import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";

function Configs() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setEmail(decoded.email);
      setNome(decoded.nome);
    }
  }, []);

  const handleSalvar = async () => {
    if (!nome.trim()) {
      setErro("Nome não pode estar vazio");
      return;
    }
    if (!novaSenha || !novaSenha.trim() ) {
      setErro("Senha não pode estar vazia");
      return;
    }

    setCarregando(true);
    try {
      const dados = {
        nome: nome,
        senha: novaSenha,
      };

      const response = await axios.put(
        `http://localhost:3000/configs/${encodeURIComponent(email)}`,
        dados
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setSucesso("Dados atualizados com sucesso!");
        setNovaSenha("");
        setErro("");
        setTimeout(() => setSucesso(""), 3000);
      }
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao atualizar dados");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div >
      <h1>Configurações</h1>

      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}

      <div style={{ marginBottom: "15px" }}>
        <label>
          <strong>Nome:</strong>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
       
          />
        </label>
      </div>

     

      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>Nova Senha:</strong>
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            placeholder="Senha"
        
          />
        </label>
      </div>

      <button
        onClick={handleSalvar}
        disabled={carregando}
      >
        {carregando ? "Salvando..." : "Salvar Alterações"}
      </button>
    </div>
  );
}

export default Configs;
