var { MongoClient } = require('mongodb')
var mongoose = require("mongoose")
require('dotenv').config();


const uri = process.env.MONGODB_URI


const connectDB = async () => {
    try {
        mongoose.set('strictQuery',false)
        mongoose.connect(uri)
        console.log("Mongo Connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB