const express = require('express')
const app = express()
const path = require('path')
const formidable = require('express-formidable')
const cookieParser = require('cookie-parser')
require('dotenv').config()

app.use(formidable())
app.use(cookieParser())

app.use('/', express.static(path.resolve(__dirname, './static')))

app.use('/api', require(path.resolve(__dirname, './apiRouter')))

// catch client side router requests
app.get('/*', (req, res) =>
    res.sendFile(path.resolve(__dirname, './static/index.html'))
)

// start server
const port = process.env.USER_PORT
app.listen(port, () => console.log('user app on port', port))
