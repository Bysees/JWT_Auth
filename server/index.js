require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000
const app = express()
const routes = require('./router')
const errorHandler = require('./middlewares/ErrorHandler.js')


app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use('/', routes)
app.use(errorHandler)


const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)

    console.log('Соеденение с mongo DB установленно')

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

  } catch (err) {
    console.log(err)
  }
}

start()
