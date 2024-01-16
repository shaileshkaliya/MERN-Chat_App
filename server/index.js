const express = require('express')
const cors = express('cors')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send("HIi, I'm live...")
})

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on PORT ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start();