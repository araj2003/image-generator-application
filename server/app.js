const express = require('express')
const connectDB = require('./database/connect')
require('dotenv').config()
const UserRouter = require('./routes/authRoute')

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express()

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/authentication',UserRouter)

app.get('/',(req,res) => {
    res.send("Image processing")
})
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("database connected")
        app.listen(8000,() => {
            console.log("server is running on port 8000")
        })
    } catch (error) {
        console.log(error)
    }
}

start()
