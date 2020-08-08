const express = require('express')
const app = express()
const path = require('path')

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

const { port } = require('./env.js')
app.listen(port, () => console.log('server on port: ', port))
