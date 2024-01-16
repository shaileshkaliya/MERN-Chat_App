const mongoose = require('mongoose')

const connectDB = (uri) => {
    try{
        console.log("Connecting to database...");
        return mongoose.connect(uri);
    }catch(error){
        console.log("Error occured in connecting ,"+error);
    }
}

module.exports = connectDB;