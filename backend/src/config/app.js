const port = 3000

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const allowCors = require('./cors')

app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())
app.use(allowCors)

app.listen(port, () => {
    console.log(`Backend is running on port ${port}.`)
})

module.exports = app