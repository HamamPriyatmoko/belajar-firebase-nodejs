import express, { json } from 'express';
import { UsersService } from './services/users.service.js';

const app = express();
const port = 3000;

const users = new UsersService();

app.use(json());

app.get('/api', async (req, res) => {
  try {
    const user = await users.getDataUsers();
    if (user.length === 0) {
      res.status(404).json({
        message: 'Data Tidak Ditemukan',
      });
    }
    res.status(200).json({ message: 'success', user });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Gagal Mendapatkan Data Dari Database',
    });
  }
});

app.post('/api', async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      res.status(400).json({
        message: 'Bad Request: Data Tidak Valid',
      });
    }
    const respon = await users.addDataUser(data);
    res.status(200).json(respon);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Gagal Mengirimkan Data kedalam Database',
    });
  }
});

app.put('/api/:id', async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      res.status(400).json({
        message: 'Bad Request: Data Tidak Valid',
      });
    }
    const respon = await users.updateDataUser(req.params.id);
    res.status(200).json(respon);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Gagal Mengirimkan Data kedalam Database',
    });
  }
});

app.listen(port, () => {
  console.log(`This App Is Running in http://localhost:${port}`);
});
