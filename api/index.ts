import express, { json } from 'express';
import cors from 'cors';
import linkRoute from './router/link';
import mongoose from 'mongoose';


const app = express();
const port = 8000;

app.use(json());
app.use(cors());

app.use('/', linkRoute);

const run = async () => {
  await mongoose.connect('mongodb://localhost/links');

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  })
};

void run();