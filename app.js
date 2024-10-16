import express from 'express';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';

const { PORT = 3000 } = process.env;

const app = express();

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT, () => {
  console.log(`Aplicativo executando na porta ${PORT}`);
});