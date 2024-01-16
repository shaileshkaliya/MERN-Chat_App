const express = require('express')
const cors = express('cors')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8000;
const connectDB = require('./Connect.js')

const mongo_uri = process.env.Mongo_URI;

app.get('/', (req, res) => {
    res.send("HIi, I'm live...")
})

const start = async() => {
    try {
        await connectDB(mongo_uri);
        console.log("Successfully connected to Database");
        app.listen(PORT, () => {
            console.log(`Server started on PORT ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start();