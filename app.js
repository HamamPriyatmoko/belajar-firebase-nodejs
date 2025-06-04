import express, { json } from 'express';
import { UsersService } from './services/users.service.js';

const app = express();
const port = 3000;

app.use(json());

app.get('/api', async (req, res) => {
  const users = new UsersService();
  const user = await users.getDataUsers();
  res.json(user[0]);
});

app.post('/api', async (req, res) => {
  const data = req.body;
});

app.listen(port, () => {
  console.log(`This App Is Running in http://localhost:${port}`);
});
