const path = require('path')
const User = require(path.resolve(__dirname, '../../models/user'))
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res) => {
    const user = await User.findOne({ email: req.fields.email })

    if(!user.verified) res.status(401).send('cuenta no verificada')

    // if not found such user in database send 204 code (no content)
    if (!user) res.status(204).send()
    else {
	// if right password
        if (await bcrypt.compareSync(req.fields.pass, user.hashedPass))
            try {
                res.status(200)
		    // standard http token cookie
                    .cookie(
                        'token',
                        `Bearer ${await jwt.sign(
                            user._id.toString(),
                            process.env.LOGIN_JWT_KEY
                        )}`,
                        { httpOnly: true }
                    )
                    .send()
            } catch (err) {
                res.status(500).send()
            }
        else res.status(401).send()
    }
}
