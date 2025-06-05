import database from '../firestore/config.cjs';
import { v4 as uuidv4 } from 'uuid';
import { object, string } from 'yup';
import sendEmailVerification from '../utils/sendEmail.js';
const { db, auth } = database;

export class UsersService {
  registerUser = async (body) => {
    try {
      let userSchema = object({
        email: string().email().required('Email is Required'),
        phoneNumber: string().required('Telephone is Required'),
        password: string().required('Password is Required'),
        displayName: string().required('Username is Required'),
        photoURL: string().url().optional(),
      });
      const data = await userSchema.validate({
        email: body.email,
        phoneNumber: body.phoneNumber,
        password: body.password,
        displayName: body.username,
        photoURL: 'http://www.example.com/12345678/photo.png',
      });
      const userCredential = await auth.createUser(data);
      const email = userCredential.email;
      const link = await auth.generateEmailVerificationLink(email);
      const info = await sendEmailVerification(email, userCredential.displayName, link);
      console.log(userCredential);
      console.log(info);
      return { userCredential, info };
    } catch (error) {
      console.log(error);
      throw new Error(error.errors || error.message);
    }
  };

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
