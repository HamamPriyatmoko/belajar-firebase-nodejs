import database from '../firestore/config.cjs';
import { v4 as uuidv4 } from 'uuid';
const { db } = database;

export class UsersService {
  users = [];

  getDataUsers = async () => {
    const userCollection = await db.collection('users').get();
    userCollection.forEach((doc) => {
      this.users.push(doc.data());
    });
    return this.users;
  };

  addDataUser = async (objectData) => {
    const respon = await db.collection('users').doc(uuidv4()).set(objectData);
    return respon;
  };
}
