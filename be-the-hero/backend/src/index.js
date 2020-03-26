const express = require('express');
const routes = require('./routes')
const cors = require('cors');
const app = express();

app.use(express.json()); //pra que o formato json possa ser entendido
app.use(routes);
app.use(cors());

app.listen(3333); //Quando eu acessar localhost:3333, estarei acessando minha aplicação. Poderia usar a porta 80 (pra usar somente localhost), mas pode ser problemática em alguns SOs.