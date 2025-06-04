const express = require('express');
const { usersService } = require('./services/users.service.js');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const users = new usersService();
  const user = await users.getDataUsers();
  res.json(user[0]);
});

app.listen(port, () => {
  console.log(`This App Is Running in http://localhost:${port}`);
});
