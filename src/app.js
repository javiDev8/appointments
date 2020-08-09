const express = require('express')
const app = express()
const path = require('path')
const formidable = require('express-formidable')
require('dotenv').config()

// init database
require(path.resolve(__dirname, 'database'))

// setting middlewares
app.use(formidable())

// static files (bundles)
app.use('/', express.static(path.resolve(__dirname, 'user/static')))
app.use('/admin', express.static(path.resolve(__dirname, 'admin/static')))

// api routers
app.use('/api', require(path.resolve(__dirname, 'user/apiRouter')))
app.use('/admin/api', require(path.resolve(__dirname, 'admin/apiRouter')))

// catch client side router request
app.get('/*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'user/static/index.html'))
)
app.get('/admin/*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'admin/static/index.html'))
)

// start server
const port = process.env.PORT
app.listen(port, () => console.log('server on port: ', port))
