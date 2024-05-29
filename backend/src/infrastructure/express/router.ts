import express from 'express';
import nivelController from './controllers/nivel';

const app = express();

app.use('/niveis', nivelController);

export default app;