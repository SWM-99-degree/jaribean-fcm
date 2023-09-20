const { MongoClient } = require('mongodb');

require('dotenv').config();

const URL = process.env.MONGODB_URL;
const DB_CONNECTION = new MongoClient(URL);
console.log(DB_CONNECTION)
console.log(1)

module.exports.DB_CONNECTION = DB_CONNECTION;