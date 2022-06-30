const express = require('express')
const cors = require('cors')
const app = express()
const client = require('./mongodb.js')
const routes = require('./router')
const errorHandler = require('./middlewares/ErrorHandler.js')

const PORT = 4000

app.use(cors())
app.use(express.json())
app.use('/', routes)
app.use(errorHandler)



const start = async () => {
  try {
    await client.connect()
    console.log('Соеденение с mongo DB установленно')

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })

  } catch (err) {
    console.log(err)
  }
}

start()
