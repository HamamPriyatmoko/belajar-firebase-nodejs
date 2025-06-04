import database from '../firestore/config.cjs';
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
}
