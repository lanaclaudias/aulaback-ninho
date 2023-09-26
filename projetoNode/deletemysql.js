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

// Rota para lidar com o método GET para buscar um usuário por ID
app.get('/api/usuarios/', (req, res) => {
  const { id } = req.params;

  // Consultar o banco de dados para buscar um usuário pelo ID
  const sql = 'SELECT * FROM usuario ';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erro ao buscar registro: ' + err.message);
      res.status(500).json({ error: 'Erro ao buscar registro' });
    } else {
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
      }
    }
  });
});

// Rota para lidar com o método DELETE para excluir um usuário por ID
app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;

  // Excluir o registro na tabela 'usuario' no banco de dados pelo ID
  const sql = 'DELETE FROM usuario WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir registro: ' + err.message);
      res.status(500).json({ error: 'Erro ao excluir registro' });
    } else {
      if (result.affectedRows > 0) {
        console.log('Registro excluído com sucesso!');
        res.status(200).json({ message: 'Registro excluído com sucesso' });
      } else {
        console.log('Registro não encontrado.');
        res.status(404).json({ message: 'Registro não encontrado' });
      }
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
