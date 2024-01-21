const express = require('express')
const cors = require('cors')
require('dotenv').config()
const router = require('./routes/user-routes.js')
 
const app = express();
const PORT = process.env.PORT || 8000;
const connectDB = require('./Connect.js')

const mongo_uri = process.env.Mongo_URI;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send("HIi, I'm live...")
})

app.use("/api/auth", router);


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