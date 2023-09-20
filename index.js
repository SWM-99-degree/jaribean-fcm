const loggingController = require('./src/controller/index.js');

var express = require('express');
var app = express();
var port = 3000;
require('dotenv').config();

console.log(process.env.MONGODB_URL);

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
loggingController.fcmRequestHandler