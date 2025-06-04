const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('../belajar-nodejs-firebase-firebase-adminsdk-fbsvc-6b424b9664.json');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = db;
