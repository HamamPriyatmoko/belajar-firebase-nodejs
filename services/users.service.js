import database from '../firestore/config.cjs';
import { v4 as uuidv4 } from 'uuid';
const { db } = database;

export class UsersService {
  getDataUsers = async () => {
    const userCollection = await db.collection('users').get();
    let users = [];
    userCollection.forEach((doc) => {
      users.push(Object.assign({ id: doc.id }, doc.data()));
    });
    return users;
  };

  addDataUser = async (objectData) => {
    const respon = await db.collection('users').doc(uuidv4()).set(objectData);
    return respon;
  };

  updateDataUser = async (id, data) => {
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();
    if (!doc.exists) {
      return null;
    }
    const update = await userRef.update(data);
    return update;
  };

  deleteDataUser = async (id) => {
    const userRef = await db.collection('users').doc(id);
    const doc = await userRef.get();
    if (!doc.exists) {
      return null;
    }
    const deleteUser = await userRef.delete();
    return deleteUser;
  };
}
