const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('testing'))

const { port } = require('./env.js')
app.listen(port, () => console.log('server on port: ', port))
