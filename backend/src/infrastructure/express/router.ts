import express from 'express';
import nivelController from './controllers/nivel';
import developerController from './controllers/developer';

const app = express();

app.use('/niveis', nivelController);
app.use('/desenvolvedores', developerController);

export default app;