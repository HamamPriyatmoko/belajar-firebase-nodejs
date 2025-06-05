import express, { json } from 'express';
import routes from './routes/api.js';
const app = express();
const port = 3000;

app.use(json());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`This App Is Running in http://localhost:${port}`);
});
