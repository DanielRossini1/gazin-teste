import express, { Express } from 'express';

import api from './router';

const app: Express = express();

app.use(express.json());

app.use('/', api);

export default app;