const path = require('path')
const Admin = require(path.resolve(__dirname, '../../models/admin'))
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
    // if request doesnt event have token send 'unauthorized'
    if (!req.cookies.token) {
        res.status(401).send()
        return
    }
    // get token from cookie
    const token = req.cookies.token.split(' ')[1]

    try {
        // find admin with such token
        let admin = await Admin.findOne({
            _id: await jwt.verify(token, process.env.ADMIN_LOGIN_JWT_KEY),
        }).select('_id')

        // if admin exists go to controller
        if (admin) next()
    } catch (err) {
        // invalid or expired token
        setTimeout(() => res.status(401).send(), 5000)
    }
}
