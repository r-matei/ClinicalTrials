const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const app = express()
const http = require('http').Server(app)
 
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())

require('./routes')(app)

sequelize.sync({force: true}) // {force: true} to delete all tables from database
  .then(() => {
    http.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
