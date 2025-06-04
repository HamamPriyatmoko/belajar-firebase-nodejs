const db = require('../firestore/config.js');

class usersService {
  users = [];
  getDataUsers = async () => {
    const userCollection = await db.collection('users').get();
    userCollection.forEach((doc) => {
      this.users.push(doc.data());
    });
    return this.users;
  };
}

module.exports = { usersService };
