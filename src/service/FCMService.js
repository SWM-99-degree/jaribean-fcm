const admin = require('firebase-admin');
const serviceAccount = require('../../FCMKey.json');

const fcm_admin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

