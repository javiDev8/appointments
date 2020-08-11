const path = require('path')
const User = require(path.resolve(__dirname, '../../models/user'))

module.exports = async (req, res) => {
    try {
        res.status(200).send(
            await User.find(req.fields.filter).select('-hashedPass')
        )
    } catch (err) {
        res.status(500).send()
    }
}
