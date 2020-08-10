const path = require('path')
const User = require(path.resolve(__dirname, '../../models/user'))
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
    console.log('req cookies:', req.cookies)

    // if request doesnt event have token send 'unauthorized'
    if (typeof req.cookies.token === 'undefined') {
        res.status(401).send()
        return
    }
    // get token from cookie
    const token = req.cookies.token.split(' ')[1]

    try {
        // find user with such token
        let user = await User.findOne({
            _id: await jwt.verify(token, process.env.LOGIN_JWT_KEY),
        }).select('name')
	req.user = user
	next()
    } catch (err) {
	// invalid or expired token
        res.status(401).send()
    }
}
