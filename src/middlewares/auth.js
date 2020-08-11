const jwt = require('jsonwebtoken')

// returns a middleware
module.exports = key => async (req, res, next) => {

    // if request doesnt event have token send 'unauthorized'
    if (!req.cookies.token) {
	setTimeout(() => res.status(401).send(), 3000)
        return
    }

    // get token from cookie
    const token = req.cookies.token.split(' ')[1]

    try {
        // get signed id
	req.id = await jwt.verify(token, key)
	next()
    } catch (err) {
	// invalid or expired token
	setTimeout(() => res.status(401).send(), 3000)
    }
}
