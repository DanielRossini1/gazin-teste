import express from 'express';
import nivelController from './controllers/nivel';

const app = express();

app.use('/nivel', nivelController);

export default app;