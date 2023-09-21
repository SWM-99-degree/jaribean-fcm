const loggingController = require('./src/controller/index.js');

var express = require('express');
var app = express();
var port = 3000;
require('dotenv').config();



// 받아야 할 매개 변수
// FCM 을 보낸 json 파일, FCM을 보낸 유저 이름 첫번째인지, messageId, userId
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log("start! express server on port 3000")
})

// const mogoose = require('mongoose');
// const { default: fcmRequestHandler } = require('./src/controller/loggingController');
// mogoose
//     .connect(process.env.MONGODB_URL)
//     .then(() => console.log('MONGODB connected'))
//     .catch((err) => {
//         console.log(err);
//       });
let message = '{"android": {"notification": {"body": "\uc0c8\ub85c\uc6b4 \ub9e4\uce6d \uc694\uccad\uc785\ub2c8\ub2e4!", "channel_id": "jari_bean_alert", "notification_priority": "PRIORITY_HIGH", "title": "\ub9e4\uce6d \uc694\uccad!"}}, "data": {"peopleNumber": "2", "type": "matchingRequest", "userId": "64fd48821a11b172e165f2fd", "username": "admin@email.com"}, "notification": {"body": "\uc0c8\ub85c\uc6b4 \ub9e4\uce6d \uc694\uccad\uc785\ub2c8\ub2e4!", "title": "\ub9e4\uce6d \uc694\uccad!"}, "token": "dLTGtJtQvqIaetrRbL9oua:APA91bF9B_2y_O2knqc6YedBLHgCyMdY-M1mkKSN3SBzcKngNKzQ0JAyPYe8MVgwUvMZrApvw7JAx9G1yu0YtKHROj6ySMVrsItNVM3w4zr2FmumWQbLlhljMHqVs_J_q6yHeYC92L7E"}'
let updatedMessage = JSON.parse(message);
console.log(updatedMessage);


loggingController.fcmRequestHandler