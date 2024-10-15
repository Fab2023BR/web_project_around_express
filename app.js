const express = require('express');

const { PORT = 3000 } = process.env;

app.use('/', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

const app = express();