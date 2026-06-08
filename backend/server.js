import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors'; // 1. Importa o CORS

const app = express();

app.use(cors()); // 2. Habilita o CORS para permitir requisições do React
app.use(express.json());

const JWT_SECRET = 'sua_chave_secreta_aqui';

// Usuário simulado (Senha: '123456')
const usuarioFake = {
  email: 'admin@email.com',
  senhaHash: '$2b$10$13T4x1mVb0ifV4p3AsfXpeJ5Lb9C2IFIqFHd3.lXI2Y50WEhsp53i' 
};

app.get('/home', (request, response) => {
    return response.send("Bem-vindo à nossa API!");
});

// 3. Rota de Login que o Axios vai chamar
app.post('/login', async (request, response) => {
    const { email, senha } = request.body;

    // 🔍 LINHA DE DIAGNÓSTICO:
    // Copie o código que aparecerá no seu terminal e substitua no 'senhaHash' lá em cima
    const hashGerado = await bcrypt.hash(senha, 10);
    console.log(`Hash gerado para a senha "${senha}":`, hashGerado);

    if (email !== usuarioFake.email) {
        return response.status(401).json({ mensagem: ' Credenciais inválidas' });
    }

    // Compara a senha digitada com ela mesma criptografada na hora (apenas para testar se passa!)
    const senhaValida = await bcrypt.compare(senha, usuarioFake.senhaHash);
    
    if (!senhaValida) {
        return response.status(401).json({ mensagem: ' Credenciais inválidas' });
    }

    const token = jwt.sign({ email: usuarioFake.email }, JWT_SECRET, { expiresIn: '1h' });
    return response.json({ token });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));