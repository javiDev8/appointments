const path = require('path')
const Admin = require(path.resolve(__dirname, '../../models/admin'))
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const expressBrute = require('express-brute')
require('dotenv').config()

module.exports = (req, res) => {
    console.log( 'on admin login' )
    console.log( 'typeof sent email: ',typeof req.fields.email )
    res.status(401).send()
}
