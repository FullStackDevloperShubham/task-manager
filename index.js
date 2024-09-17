const express = require('express')
const app = express()
require('dotenv').config();
const router = require('./routes/task.routes.js')
// mongo connection
const connection = require('./dbconnetion/db.connection.js')


const port = process.env.PORT || 3000


// middleware
app.use(express.static('./public'))
app.use(express.json())


// use routes
app.use('/api/v1/task', router)




app.listen(port, () => {
  connection()
  console.log(`http://localhost:${port}`)
})
