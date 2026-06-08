import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importando o axios

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await axios.post('http://localhost:3000/login', {
        email,
        senha
      });

      const token = resposta.data.token;

      if (token) {
        localStorage.setItem('token', token); // Guardando o JWT 
        setErro('');
        navigate('/dashboard'); //  Redirecionando para a rota protegida
      }
    } catch (err) {
      if (err.response && err.response.data) {
    
        if (err.response.data.mensagem === "Senha incorreta") {
          setErro("Senha incorreta");

        } 
        else if(err.response.data.mensagem === "Usuário não encontrado"){
          setErro("Usuário não encontrado");
        }
        else {
          setErro(err.response.data.mensagem || "Erro desconhecido");
        }

      } else {
        setErro("Erro ao conectar com o servidor");
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2> Tela de Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '10px' }}>
        <div>
          <label>E-mail:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;