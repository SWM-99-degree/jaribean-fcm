const DB_CONNECTION = require("../models/index.js");
const admin = require('firebase-admin');
const serviceAccount = require('../../FCMKey.json');

const fcm_admin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// 서버에서 받는 로직
const fcmRequestHandler = async () => {

    const DB = await DB_CONNECTION.DB_CONNECTION
    const collection = await DB.db('jariBean').collection('fcmlogging');
    const changeStream = collection.watch([{ $match: { operationType: { $in: ['insert', 'update'] }}}], {fullDocument: 'updateLookup'});
    try {
        while (await changeStream.hasNext()) {
            const chagedDocument = await changeStream.next();
            const fullDocument = chagedDocument.fullDocument;
            
            console.log(fullDocument);
            checkingSuccess(fullDocument);
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
const checkingSuccess = async (fullDocument) => {
    setTimeout(async () => {
        let sendMessage = JSON.parse(fullDocument.fcmMessage);
        sendMessage.data.loggingId = String(fullDocument._id);

        const DB = await DB_CONNECTION.DB_CONNECTION;
        const collection = DB.db('jariBean').collection('fcmlogging');
        const query = {"_id" : fullDocument._id};
        const loggingDocument = await collection.findOne(query);

        if (loggingDocument.status > 0 && loggingDocument.status < 3) {
            
            fcm_admin.messaging().send(sendMessage)
            
            collection.updateOne(query, {$set : {
                "status" : loggingDocument.status + 1
            }})
        }
        console.log('clear!');
    }, 20000);
    
}

exports.fcmRequestHandler = fcmRequestHandler();