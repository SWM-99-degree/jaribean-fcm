const { MongoClient } = require('mongodb');

require('dotenv').config();

const URL = process.env.MONGODB_URL;
const DB_CONNECTION = new MongoClient(URL);


module.exports.DB_CONNECTION = DB_CONNECTION;