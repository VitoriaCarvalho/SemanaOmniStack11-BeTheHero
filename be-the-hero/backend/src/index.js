const express = require('express');
const cors = require('cors');
const routes = require('./routes')
const app = express();

app.use(cors());
app.use(express.json()); //pra que o formato json possa ser entendido
app.use(routes);

app.listen(3333); //Quando eu acessar localhost:3333, estarei acessando minha aplicação. Poderia usar a porta 80 (pra usar somente localhost), mas pode ser problemática em alguns SOs.