const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Configurar conexão com o MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'projeto'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err.message);
  } else {
    console.log('Conectado ao MySQL');
  }
});

// Middleware para lidar com dados codificados no corpo da solicitação
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota para lidar com o método POST para inserir um usuário
app.post('/api/usuarios', (req, res) => {
  const { email, senha } = req.body;

  // Inserir os dados na tabela 'usuario' no banco de dados usando uma query parametrizada
  const sql = 'INSERT INTO usuario (email, senha) VALUES (?, ?)';
  connection.query(sql, [email, senha], (err, result) => {
    if (err) {
      console.error('Erro ao inserir registro: ' + err.message);
      res.status(500).json({ error: 'Erro ao inserir registro' });
    } else {
      console.log('Registro inserido com sucesso!');
      res.status(201).json({ message: 'Registro inserido com sucesso' });
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
