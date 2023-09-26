// Importando o Módulo do Express
const express = require('express');
 
// Criando um objeto do Express
const app = express();
 
// resgatando os dados da requisição
app.get('/', (req, res) => {
    res.send('A simple Node App is '
        + 'running on this server Node Js 2023 Ninho')
    res.end()
})

app.get('/clientes', (req, res) => {
    res.send('Clientes:  '
        + 'Nilson Junior')
    res.end()
})

app.get('/usuarios', (req, res) => {
    res.send('Usuários:  '
        + 'Tavares Junior')
    res.end()
})

 
// Numero da Porta
const PORT = process.env.PORT ||5001;
 
// Executar o Servicor Node
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));