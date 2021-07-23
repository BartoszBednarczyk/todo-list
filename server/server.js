require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
var cors = require('cors');

mongoose.connect('mongodb://localhost:27017/boards', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
// app.use(cors({
//     origin: 'http://localhost:4200/'
// }))


const boardsRouter = require('./routes/boards')
app.use('/boards', boardsRouter)

app.listen(3000, () => console.log('Server Started'))