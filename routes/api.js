import express from 'express';
import { UsersService } from '../services/users.service.js';
const router = express.Router();
const users = new UsersService();

router.get('/users', async (req, res) => {
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

router.post('/users', async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      res.status(400).json({
        message: 'Bad Request: Data Tidak Valid',
      });
    }
    const respon = await users.addDataUser(data);
    res.status(200).json({ message: 'success', respon });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Gagal Mengirimkan Data kedalam Database',
    });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const respon = await users.updateDataUser(id, data);

    if (!respon) {
      res.status(404).json({
        message: 'User Tidak Ditemukan',
      });
    }

    res.status(200).json({
      message: 'Succes',
      data: `Data Berhasil Di Update`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Gagal Mengirimkan Data kedalam Database',
    });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const respon = await users.deleteDataUser(id);

    if (!respon) {
      return res.status(404).json({
        message: 'User Tidak Ditemukan',
      });
    }

    return res.status(200).json({
      message: 'Succes',
      data: `Data Berhasil Di Hapus`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Gagal Menghapus Data di dalam Database',
    });
  }
});

export default router;
