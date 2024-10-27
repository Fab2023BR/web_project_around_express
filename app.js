import express from 'express';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';
import mongoose from mongoose;

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use((req, res, next) => {
  req.user = {
    _id: '671e07711cddb28412f75d63',
  };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT, () => {
  console.log(`Aplicativo executando na porta ${PORT}`);
});