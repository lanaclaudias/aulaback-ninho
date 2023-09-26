const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Configurar conexão com o MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'back'
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

app.get('/clientes', (req, res) => {
  const query = 'SELECT * FROM cliente';

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
    res.json(results);
  });
});

app.post('/clientes', (req, res) => {
  const { nome, cpf, email, idade } = req.body;
  const query = 'INSERT INTO cliente (nome, cpf, email, idade) VALUES (?, ?, ?, ?)';

  connection.query(query, [nome, cpf, email, idade], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar cliente' });
    }
    res.status(201).json({ message: 'Cliente criado com sucesso', clienteId: results.insertId });
  });
});

app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nome, cpf, email, idade } = req.body;
  const query = 'UPDATE cliente SET nome = ?, cpf = ?, email = ?, idade = ? WHERE id = ?';

  connection.query(query, [nome, cpf, email, idade, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
    res.json({ message: 'Cliente atualizado com sucesso' });
  });
});

app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM cliente WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao excluir cliente' });
    }
    res.json({ message: 'Cliente excluído com sucesso' });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
