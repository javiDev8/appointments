const path = require('path')
const Admin = require(path.resolve(__dirname, '../../models/admin'))
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = async (req, res) => {
    const admin = await Admin.findOne({ name: req.fields.name })
    if (!admin) {
        setTimeout(() => res.status(401).send(), 5000)
        return
    }
    if (await bcrypt.compareSync(req.fields.pass, admin.hashedPass))
        try {
            res.status(200)

                // standard http token cookie
                .cookie(
                    'token',
                    `Bearer ${await jwt.sign(
                        admin._id.toString(),
                        process.env.ADMIN_LOGIN_JWT_KEY
                    )}`,
                    { httpOnly: true }
                )
                .send()
        } catch (err) {
            res.status(401).send()
        }
    // if wrong password delay respnonse
    else setTimeout(() => res.status(401).send(), 5000)
}
