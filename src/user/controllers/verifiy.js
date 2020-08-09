const jwt = require('jsonwebtoken')
const path = require('path')
const User = require(path.resolve(__dirname, '../../models/user'))

module.exports = async (req, res) => {
    try {
        const dehashedToken = await jwt.verify(
            req.query.hash,
            process.env.VERIF_EMAIL_JWT_KEY
        )
        const userMatch = await User.findOne({
            email: dehashedToken.data,
        })

        // if user found set as verified
        if (userMatch) {
	    console.log( 'lets verify the user!' )
            userMatch.verified = true
            userMatch.save()
            res.redirect('/login')
        } else res.status(442).send()
    } catch (err) {
        res.status(442).send()
    }
}
