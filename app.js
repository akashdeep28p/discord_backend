const express = require('express')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    })
    .catch((err) => {
        console.log('Connection to database failed')
        console.error(err)
    })



