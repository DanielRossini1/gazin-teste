import express from 'express';
import nivelController from './controllers/nivel';
import developerController from './controllers/developer';
import cors from 'cors';

const app = express();

app.use(cors());

app.use('/niveis', nivelController);
app.use('/desenvolvedores', developerController);

export default app;