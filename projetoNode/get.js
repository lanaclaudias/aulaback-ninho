const express = require('express');
const app = express();
const port = 3000; // Porta em que o servidor irá escutar

// Rota para o método GET
app.get('/', (req, res) => {
  res.send('Olá, mundo! Esta é a resposta do método GET.');
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
