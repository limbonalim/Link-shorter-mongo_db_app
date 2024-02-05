import express, { json } from 'express';
import cors from 'cors';
import linkRoute from './router/link';


const app = express();
const port = 8000;

app.use(json());
app.use(cors());

app.use('/', linkRoute);

const run = () => {
  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

void run();