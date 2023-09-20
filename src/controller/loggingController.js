const DB_CONNECTION = require("../models/index.js");


// 서버에서 받는 로직
const fcmRequestHandler = async () => {
    const DB = await DB_CONNECTION.DB_CONNECTION
    const collection = await DB.db('jariBean').collection('fcmlogging');
    const changeStream = collection.watch([{ $match: { operationType: { $in: ['insert', 'update'] }}}], {fullDocument: 'updateLookup'});
    try {
        while (await changeStream.hasNext()) {
            const chagedDocument = await changeStream.next();
            const fullDocument = chagedDocument.fullDocument;
            console.log(fullDocument)
            console.log(fullDocument.status);
            //fullDocument.fullDocument;
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
const checkingSuccess = async () => {

}

exports.fcmRequestHandler = fcmRequestHandler();