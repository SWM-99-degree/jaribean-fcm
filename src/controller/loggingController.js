const DB_CONNECTION = require("../models/index.js");
const admin = require('firebase-admin');
const serviceAccount = require('../../FCMKey.json');

const fcm_admin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// 서버에서 받는 로직
const fcmRequestHandler = async () => {
    let message = '{"android": {"notification": {"body": "\uc0c8\ub85c\uc6b4 \ub9e4\uce6d \uc694\uccad\uc785\ub2c8\ub2e4!", "channel_id": "jari_bean_alert", "notification_priority": "PRIORITY_HIGH", "title": "\ub9e4\uce6d \uc694\uccad!"}}, "data": {"peopleNumber": "2", "type": "matchingRequest", "userId": "64fd48821a11b172e165f2fd", "username": "admin@email.com"}, "notification": {"body": "\uc0c8\ub85c\uc6b4 \ub9e4\uce6d \uc694\uccad\uc785\ub2c8\ub2e4!", "title": "\ub9e4\uce6d \uc694\uccad!"}, "token": "dLTGtJtQvqIaetrRbL9oua:APA91bF9B_2y_O2knqc6YedBLHgCyMdY-M1mkKSN3SBzcKngNKzQ0JAyPYe8MVgwUvMZrApvw7JAx9G1yu0YtKHROj6ySMVrsItNVM3w4zr2FmumWQbLlhljMHqVs_J_q6yHeYC92L7E"}'
    let updatedMessage = JSON.parse(message);
    console.log(updatedMessage);
    fcm_admin.messaging().send(updatedMessage).then((response) => {
        console.log('Successfully sent message: : ');
    }
    )

    const DB = await DB_CONNECTION.DB_CONNECTION
    const collection = await DB.db('jariBean').collection('fcmlogging');
    const changeStream = collection.watch([{ $match: { operationType: { $in: ['insert', 'update'] }}}], {fullDocument: 'updateLookup'});
    try {
        while (await changeStream.hasNext()) {
            const chagedDocument = await changeStream.next();
            const fullDocument = chagedDocument.fullDocument;
            console.log(fullDocument)
            console.log(fullDocument.status);
            checkingSuccess()
        }
     } catch (error) {
        if (changeStream.isClosed()) {
           console.log("The change stream is closed. Will not wait on any more changes.")
        } else {
           throw error;
       }
    
    }
}


// 서버에서 20 초 뒤에 실행하는 비동기 로직
const checkingSuccess = async (message, status) => {

    let updatedMessage = JSON.parse(message);
    console.log(updatedMessage);
    fcm_admin.messaging().send(updatedMessage).then((response) => {
        console.log('Successfully sent message: : ');
    }
    )
    

}

exports.fcmRequestHandler = fcmRequestHandler();